use mongodb::{ bson::{ doc, Document }, Client, Database };

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let uri = "<connection string>";

    let client = Client::with_uri_str(uri).await?;

    // start-runcommand
    let my_db = client.database("plants");
    let count_command = doc! { "count": "flowers" };
    let explain_command =
        doc! {
        "explain": count_command,
        "verbosity": "queryPlanner"
    };

    let result = my_db.run_command(explain_command, None).await?;
    // end-runcommand

    println!("{}", result);

    Ok(())
}
