const { ErrorMessageBuilder } = require('../errorReporting');
const { MongoshComparisonEngine } = require('../MongoshComparisonEngine');
const Expect = require('../Expect');
const makeTempFileForTesting = require('../../makeTempFileForTesting');
const path = require('path');

describe('Improved Error Messages for Technical Writers', () => {
  describe('ErrorMessageBuilder.fileNotFound()', () => {
    it('should provide helpful error message with resolved path', () => {
      const baseDir = '/Users/writer/project/examples';
      const filepath = 'queries/find-users.sh';
      
      const message = ErrorMessageBuilder.fileNotFound(filepath, baseDir);
      
      expect(message).toContain('File not found: "queries/find-users.sh"');
      expect(message).toContain('Resolved path:');
      expect(message).toContain('Base directory: /Users/writer/project/examples');
      expect(message).toContain('💡 Troubleshooting tips:');
      expect(message).toContain('Check that the file path is correct');
      expect(message).toContain('Verify the file exists');
      expect(message).toContain('Make sure the file extension is included');
    });

    it('should customize context in error message', () => {
      const baseDir = '/Users/writer/project/examples';
      const filepath = 'queries/insert.js';
      
      const message = ErrorMessageBuilder.fileNotFound(filepath, baseDir, 'code example');
      
      expect(message).toContain('code example');
    });

    it('should handle absolute paths', () => {
      const baseDir = '/Users/writer/project/examples';
      const filepath = '/absolute/path/to/file.sh';
      
      const message = ErrorMessageBuilder.fileNotFound(filepath, baseDir);
      
      expect(message).toContain('File not found: "/absolute/path/to/file.sh"');
      expect(message).toContain('Resolved path: /absolute/path/to/file.sh');
    });
  });

  describe('ErrorMessageBuilder.connectionError()', () => {
    it('should detect connection refused errors', () => {
      const error = new Error('connect ECONNREFUSED 127.0.0.1:27017');
      const port = '27017';
      
      const message = ErrorMessageBuilder.connectionError(error, port);
      
      expect(message).toContain('Failed to connect to MongoDB');
      expect(message).toContain('❌ Connection refused');
      expect(message).toContain('MongoDB is not running or not accessible');
      expect(message).toContain('💡 Troubleshooting tips:');
      expect(message).toContain('Ensure MongoDB is running on port 27017');
      expect(message).toContain('Check that the port number is correct in your .env file');
      expect(message).toContain('mongosh --port 27017');
    });

    it('should detect timeout errors', () => {
      const error = new Error('connection timeout after 30000ms');
      const port = '27017';
      
      const message = ErrorMessageBuilder.connectionError(error, port);
      
      expect(message).toContain('⏱️  Connection timeout');
      expect(message).toContain('MongoDB is not responding');
      expect(message).toContain('Check that MongoDB is running and responsive');
    });

    it('should detect authentication errors', () => {
      const error = new Error('Authentication failed for user');
      const port = '27017';
      
      const message = ErrorMessageBuilder.connectionError(error, port);
      
      expect(message).toContain('🔒 Authentication failed');
      expect(message).toContain('Verify your MongoDB credentials');
      expect(message).toContain('Check the CONNECTION_STRING in your .env file');
    });

    it('should provide generic troubleshooting for unknown errors', () => {
      const error = new Error('Unknown database error');
      const port = '27017';
      const connectionString = 'mongodb://localhost:27017';
      
      const message = ErrorMessageBuilder.connectionError(error, port, connectionString);
      
      expect(message).toContain('Failed to connect to MongoDB');
      expect(message).toContain('💡 Troubleshooting tips:');
      expect(message).toContain('Verify MongoDB is running');
      expect(message).toContain('Check your .env file configuration');
      expect(message).toContain('CONNECTION_STRING should be a valid MongoDB URI');
      expect(message).toContain('Current connection string: mongodb://localhost:27017');
    });
  });

  describe('ErrorMessageBuilder.mongoshExecutionError()', () => {
    it('should detect connection refused in mongosh execution', () => {
      const error = new Error('Command failed');
      const command = 'mongosh --file /tmp/test.js --port 27017';
      const stderr = 'MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017';
      
      const message = ErrorMessageBuilder.mongoshExecutionError(error, command, stderr);
      
      expect(message).toContain('Failed to execute mongosh command');
      expect(message).toContain('Command: mongosh --file /tmp/test.js --port 27017');
      expect(message).toContain('❌ Cannot connect to MongoDB');
      expect(message).toContain('This is likely a connection issue');
      expect(message).toContain('Ensure MongoDB is running');
      expect(message).toContain('Verify the CONNECTION_STRING and CONNECTION_PORT');
    });

    it('should detect mongosh not installed', () => {
      const error = new Error('mongosh: command not found');
      const command = 'mongosh --file /tmp/test.js --port 27017';
      
      const message = ErrorMessageBuilder.mongoshExecutionError(error, command);
      
      expect(message).toContain('❌ mongosh command not found');
      expect(message).toContain('Please install mongosh');
      expect(message).toContain('https://www.mongodb.com/docs/mongodb-shell/install/');
    });

    it('should include stderr output when available', () => {
      const error = new Error('Execution failed');
      const command = 'mongosh --file /tmp/test.js --port 27017';
      const stderr = 'SyntaxError: Unexpected token';
      
      const message = ErrorMessageBuilder.mongoshExecutionError(error, command, stderr);
      
      expect(message).toContain('Mongosh stderr:');
      expect(message).toContain('SyntaxError: Unexpected token');
    });

    it('should provide generic troubleshooting for unknown errors', () => {
      const error = new Error('Unknown error');
      const command = 'mongosh --file /tmp/test.js --port 27017';
      
      const message = ErrorMessageBuilder.mongoshExecutionError(error, command);
      
      expect(message).toContain('💡 Troubleshooting tips:');
      expect(message).toContain('Check that the .js file being executed is valid JavaScript');
      expect(message).toContain('Verify MongoDB is accessible');
    });
  });

  describe('MongoshComparisonEngine file not found integration', () => {
    it('should provide helpful error when expected output file is not found', () => {
      const result = MongoshComparisonEngine.compare(
        'nonexistent/output.sh',
        { name: 'Alice' }
      );

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      expect(errorMessage).toContain('File not found: "nonexistent/output.sh"');
      expect(errorMessage).toContain('Resolved path:');
      expect(errorMessage).toContain('Base directory:');
      expect(errorMessage).toContain('💡 Troubleshooting tips:');
    });
  });

  describe('makeTempFileForTesting file not found integration', () => {
    it('should provide helpful error when code example file is not found', () => {
      const details = {
        connectionString: 'mongodb://localhost:27017',
        dbName: 'test',
        filepath: 'nonexistent/query.js',
        validateOutput: true,
      };
      
      expect(() => {
        makeTempFileForTesting(details);
      }).toThrow(/File not found: "nonexistent\/query\.js"/);
      
      try {
        makeTempFileForTesting(details);
      } catch (error) {
        expect(error.message).toContain('Resolved path:');
        expect(error.message).toContain('Base directory:');
        expect(error.message).toContain('💡 Troubleshooting tips:');
        expect(error.message).toContain('code example');
      }
    });

    it('should provide helpful error for missing files in array of filepaths', () => {
      const details = {
        connectionString: 'mongodb://localhost:27017',
        dbName: 'test',
        filepath: ['nonexistent/missing.js'],
        validateOutput: true,
      };

      expect(() => {
        makeTempFileForTesting(details);
      }).toThrow(/File not found: "nonexistent\/missing\.js"/);
    });
  });

  describe('Real-world error message scenarios', () => {
    it('should help writer debug missing output file', () => {
      // Simulate: Writer forgets to create the expected output file
      const result = MongoshComparisonEngine.compare(
        'aggregation/output.sh',  // File doesn't exist
        [{ count: 5 }]
      );

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      expect(errorMessage).toContain('File not found');
      expect(errorMessage).toContain('aggregation/output.sh');
      expect(errorMessage).toContain('Check that the file path is correct');
    });

    it('should help writer debug wrong file extension', () => {
      // Simulate: Writer uses .txt instead of .sh
      const result = MongoshComparisonEngine.compare(
        'queries/find-users.txt',  // Wrong extension
        [{ name: 'Alice' }]
      );

      expect(result.isMatch).toBe(false);
      const errorMessage = result.getErrorSummary();
      // File doesn't exist, so we get file not found error with helpful tips
      expect(errorMessage).toContain('File not found');
      expect(errorMessage).toContain('Make sure the file extension is included');
    });
  });

  describe('Temp file formation error messages', () => {
    it('should provide helpful error for temp file formation issues', () => {
      const message = ErrorMessageBuilder.tempFileFormationError(
        'queries/complex-query.js',
        'Unbalanced parentheses: 5 opening, 4 closing',
        '/tmp/test.js',
        'db = connect("mongodb://localhost:27017");\nprintjson(db.users.find({name: "test"});'
      );

      expect(message).toContain('⚠️  Test Utility Issue Detected');
      expect(message).toContain('queries/complex-query.js');
      expect(message).toContain('Unbalanced parentheses');
      expect(message).toContain('This is NOT an error in your code example');
      expect(message).toContain('reach out to the DevDocs team');
      expect(message).toContain('/tmp/test.js');
      expect(message).toContain('db = connect');
    });

    it('should provide helpful error for syntax errors in temp files', () => {
      const message = ErrorMessageBuilder.tempFileSyntaxError(
        'aggregation/pipeline.js',
        'SyntaxError: Unexpected token }',
        '/tmp/test.js',
        'db = connect("mongodb://localhost:27017");\nprintjson(db.users.aggregate([}]));'
      );

      expect(message).toContain('⚠️  Syntax Error in Generated Test File');
      expect(message).toContain('aggregation/pipeline.js');
      expect(message).toContain('SyntaxError');
      expect(message).toContain('could be an issue with your code example OR the test utility');
      expect(message).toContain('Debugging steps');
      expect(message).toContain('If your code example looks correct');
      expect(message).toContain('DevDocs team');
    });
  });
});

