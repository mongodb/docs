use mongodb::{ bson::{ doc, Document }, Client, Database };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri: &str = "<connection string>";

    let client: Client = Client::with_uri_str(uri).await?;

    // start-runcommand
    let my_db: Database = client.database("plants");
    let count_command: Document = doc! { "count": "flowers" };
    let explain_command: Document =
        doc! {
        "explain": count_command,
        "verbosity": "queryPlanner"
    };

    let result: Document = my_db.run_command(explain_command, None).await?;
    // end-runcommand

    println!("{}", result);

    Ok(())
}
