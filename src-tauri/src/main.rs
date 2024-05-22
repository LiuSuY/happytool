// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::read_to_string;
use std::fs::File;
use std::io;
use std::io::BufReader;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, say_hello, open_todo])
        .run(tauri::generate_context!())
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
