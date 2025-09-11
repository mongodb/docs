import json
import sys

def process_log_file(json_file_path):
    # Dictionary to store the filtered data
    filtered_data = {}

    with open(json_file_path, "r") as json_file:
        # Read the file line by line
        for line in json_file:
            # Parse each line as a separate JSON object
            data = json.loads(line)

            if 'msg' in data and data['msg'] == 'client metadata':
                # Extract the relevant data from the JSON object
                drivername = data['attr']['doc']['driver']['name']
                driverversion = data['attr']['doc']['driver']['version']
                connectionid = data['ctx']

                # Create a unique key for the driver based on name and version
                driver_key = (drivername, driverversion)

                # Add the connection ID to the driver's set of connections
                if driver_key not in filtered_data:
                    filtered_data[driver_key] = {'connections': set(), 'opencount': 0, 'closedcount': 0}

                filtered_data[driver_key]['connections'].add(connectionid)
                filtered_data[driver_key]['opencount'] += 1

            if 'msg' in data and data['msg'] == 'Connection ended':
                connectionid = data['ctx']

                # Check if the connection ID exists in any driver's connections
                for driver_data in filtered_data.values():
                    if connectionid in driver_data['connections']:
                        driver_data['closedcount'] += 1
                        driver_data['connections'].remove(connectionid)

    # Print the filtered data for each driver
    for driver_key, driver_data in filtered_data.items():
        print('Driver:', driver_key)
        print('Connection Opened:', driver_data['opencount'])
        print('Connection Closed:', driver_data['closedcount'])

if __name__ == '__main__':
    # Check if a JSON file argument is provided
    if len(sys.argv) < 2:
        print("Please provide the path to a JSON file as an argument.")
        sys.exit(1)

    # Extract the JSON file path from the command-line arguments
    json_file_path = sys.argv[1]

    # Process the log file
    process_log_file(json_file_path)