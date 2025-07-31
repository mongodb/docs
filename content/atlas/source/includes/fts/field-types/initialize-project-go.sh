# Create a new directory and initialize the project
mkdir atlas-search-project && cd atlas-search-project
go mod init atlas-search-project

# Add the MongoDB Go Driver to your project
go get go.mongodb.org/mongo-driver/v2/mongo