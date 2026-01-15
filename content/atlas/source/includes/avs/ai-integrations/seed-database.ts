import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { MongoClient } from "mongodb";
import { z } from "zod";
import "dotenv/config";

const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});

const EmployeeSchema = z.object({
  employee_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postal_code: z.string(),
    country: z.string(),
  }),
  contact_details: z.object({
    email: z.string().email(),
    phone_number: z.string(),
  }),
  job_details: z.object({
    job_title: z.string(),
    department: z.string(),
    hire_date: z.string(),
    employment_type: z.string(),
    salary: z.number(),
    currency: z.string(),
  }),
  work_location: z.object({
    nearest_office: z.string(),
    is_remote: z.boolean(),
  }),
  reporting_manager: z.string().nullable(),
  skills: z.array(z.string()),
  performance_reviews: z.array(
    z.object({
      review_date: z.string(),
      rating: z.number(),
      comments: z.string(),
    })
  ),
  benefits: z.object({
    health_insurance: z.string(),
    retirement_plan: z.string(),
    paid_time_off: z.number(),
  }),
  emergency_contact: z.object({
    name: z.string(),
    relationship: z.string(),
    phone_number: z.string(),
  }),
  notes: z.string(),
});

type Employee = z.infer<typeof EmployeeSchema>;
const parser = StructuredOutputParser.fromZodSchema(z.array(EmployeeSchema));

async function generateSyntheticData(): Promise<Employee[]> {
  
  const prompt = `You are a helpful assistant that generates employee data. Generate 10 fictional employee records. Each record should include the following fields: employee_id, first_name, last_name, date_of_birth, address, contact_details, job_details, work_location, reporting_manager, skills, performance_reviews, benefits, emergency_contact, notes. Ensure variety in the data and realistic values.

  ${parser.getFormatInstructions()}`;

  console.log("Generating synthetic data...");

  const response = await llm.invoke(prompt);
  return parser.parse(response.content as string);
}

async function createEmployeeSummary(employee: Employee): Promise<string> {
  return new Promise((resolve) => {
    const jobDetails = `${employee.job_details.job_title} in ${employee.job_details.department}`;
    const skills = employee.skills.join(", ");
    const performanceReviews = employee.performance_reviews
      .map(
        (review) =>
          `Rated ${review.rating} on ${review.review_date}: ${review.comments}`
      )
      .join(" ");
    const basicInfo = `${employee.first_name} ${employee.last_name}, born on ${employee.date_of_birth}`;
    const workLocation = `Works at ${employee.work_location.nearest_office}, Remote: ${employee.work_location.is_remote}`;
    const notes = employee.notes;
    const summary = `${basicInfo}. Job: ${jobDetails}. Skills: ${skills}. Reviews: ${performanceReviews}. Location: ${workLocation}. Notes: ${notes}`;
    resolve(summary);
  });
}

const fetchEmbeddings = async (records: { pageContent: string }[]) => {
  const apiUrl = "https://ai.mongodb.com/v1/embeddings";  
  const apiKey = process.env.VOYAGEAI_API_KEY;
  
  const inputs = records.map(record => record.pageContent); 
  const requestBody = {  
    input: inputs,
    model: "voyage-3.5",  
  };  
  
  try {  
    const response = await fetch(apiUrl, {  
      method: "POST",  
      headers: {  
        Authorization: `Bearer ${apiKey}`,  
        "Content-Type": "application/json",  
      },  
      body: JSON.stringify(requestBody),  
    });  
  
    if (!response.ok) {  
      throw new Error(`Error: ${response.status} ${response.statusText}`);  
    }  
  
    const data = await response.json();  
    return data;
  } catch (error) {  
    console.error("Error while fetching embeddings:", error);  
  }  
};

async function seedDatabase(): Promise<void> {
  try {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("hr_database");
    const collection = db.collection("employees");
    await collection.deleteMany({});
    
    const syntheticData = await generateSyntheticData();
    const recordsWithSummaries = await Promise.all(
      syntheticData.map(async (record) => ({
        pageContent: await createEmployeeSummary(record),
        metadata: {...record},
      }))
    );

    for (const record of recordsWithSummaries ) {
        const db = client.db("hr_database");
        const collection = db.collection("employees");
        const embedding = await fetchEmbeddings([record]);
        const enrichedRecord = {
            pageContent: record.pageContent,
            metadata: record.metadata,
            embedding: embedding.data[0].embedding
        }
        const result = await collection.insertOne(enrichedRecord);
        console.log("Successfully added database record:", result);
    }
    await client.close();
  } catch (error) {
    console.error("Error seeding database:", error);
}}

seedDatabase().catch(console.error);
