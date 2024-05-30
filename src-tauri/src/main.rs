// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tokio::main]
async fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::new())
        .invoke_handler(tauri::generate_handler![
            greet,
            say_hello,
            open_todo
        ])
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
fn say_hello() -> String {
    println!("hello world");
    "hello world say hello".into()
}

#[tauri::command]
fn open_todo() -> Result<Vec<String>, String> {
    let s = read_file("./todo.txt");
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
