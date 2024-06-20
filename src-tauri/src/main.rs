// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;
mod audio_service;
use audio_service::{AudioEvent, AudioService};
use tokio::sync::broadcast::Sender;
use std::fs::OpenOptions;
use std::io::Write;

#[tokio::main]
async fn main() {
    let audio_service = AudioService::new();
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::new())
        .invoke_handler(tauri::generate_handler![
            open_todo,
            open_window_url,
            open_window_route,
            close_window,
            play_audio,
            write_todo
        ])
        .manage(audio_service.event_sender) // share
        .manage(audio_service.sink)
        .run(context)
        .expect("error while running tauri application");
}


#[tauri::command]
fn open_todo(handle: tauri::AppHandle) -> Result<Vec<String>, String> {
    let resource_path = handle.path_resolver()
      .resolve_resource("./assets/todo.txt")
      .expect("failed to resolve resource");
    let s = read_file(resource_path.to_str().unwrap());
    match s {
        Ok(content) => {
            let mut s = Vec::new();
            for line in content.lines() {
                s.push(line);
            }
            return Ok(s.into_iter().map(|x| x.to_string()).collect());
        }
        Err(e) => return Err(e.to_string()),
    }
}

fn read_file(path: &str) -> Result<String, std::io::Error> {
    let content = std::fs::read_to_string(path)?;
    Ok(content)
}

#[tauri::command]
async fn open_window_url(handle: tauri::AppHandle, url: String) {
    tauri::WindowBuilder::new(
        &handle,
        "url", /* the unique window label */
        tauri::WindowUrl::External(url.parse().unwrap()),
    )
    .build()
    .unwrap();
}

#[tauri::command]
async fn open_window_route(handle: tauri::AppHandle, path: String) {
    tauri::WindowBuilder::new(
        &handle,
        path.clone(), /* the unique window label */
        tauri::WindowUrl::App(path.into()),
    )
    .center()
    .build()
    .unwrap();
}


#[tauri::command]
fn close_window(handle: tauri::AppHandle, name: &str) {
    println!("{}", name);
    if let Some(main_window) = handle.get_window(name) {
        match main_window.close() {
            Ok(_) => (),
            Err(e) => println!("close error {}", e),
        }
    }
}

#[tauri::command] 
fn play_audio(handle: tauri::AppHandle,sender: tauri::State<Sender<AudioEvent>>, event: String) {
    let event: serde_json::Value = serde_json::from_str(&event).unwrap();
    if let Some(action) = event["action"].as_str() {
        match action {
            "play" => event["file_path"]
                .as_str()
                .map(|file_path| {
                    let resource_path = handle.path_resolver()
                    .resolve_resource(file_path)
                    .expect("failed to resolve resource");
                    sender.send(AudioEvent::Play(resource_path.to_str().unwrap().to_string()))
                }
                ),
            "pause" => Some(sender.send(AudioEvent::Pause)),
            "recovery" => Some(sender.send(AudioEvent::Recovery)),
            "volume" => event["volume"]
                .as_f64()
                .map(|volume| sender.send(AudioEvent::Volume(volume as f32))),
            _ => None, // other actions
        };
    }
}

#[tauri::command]
fn write_todo(handle: tauri::AppHandle,todos: Vec<String>) {
    let resource_path = handle.path_resolver()
      .resolve_resource("./assets/todo.txt")
      .expect("failed to resolve resource");
    let resource_path_str = resource_path.to_str().unwrap();
    let mut file = OpenOptions::new().append(true).open(resource_path_str).unwrap();
    for todo in todos {
        writeln!(file,"{}", todo).unwrap();
    }
}
