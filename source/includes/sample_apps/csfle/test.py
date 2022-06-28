import unittest
import pymongo
from bson.binary import Binary
from const import (
    BUILD_DIR,
    DIR_SEPERATOR,
    FLE_1_LANGS,
    FLE_2_LANGS,
    NODE,
    NODE_FLE_2,
    GO,
    GO_FLE_2,
    CSHARP,
    CSHARP_FLE_2,
    PYTHON,
    PYTHON_FLE_2,
    JAVA,
    JAVA_FLE_2,
    AWS_TEST,
    AZURE_TEST,
    GCP_TEST,
    LOCAL_TEST,
    FILE_MAP,
    DEK,
    INSERT,
)
import os
import ntpath

DB_NAME = "medicalRecords"
COLLECTION_NAME = "patients"
KEY_VAULT_DB = "encryption"
KEY_VAULT_COLL = "__keyVault"
CURRENT_DIRECTORY = os.getcwd()
NUM_QE_DEKS = 4
BSON_BINARY_VALUE = Binary(b"")
TEST_FLE1_ENC_FIELD = "bloodType"
TEST_FLE2_ENC_FIELD = "patientId"

FLE2_ENC_COLLS = [f"enxcol_.{COLLECTION_NAME}.esc",
f"enxcol_.{COLLECTION_NAME}.ecc",
f"enxcol_.{COLLECTION_NAME}.ecoc"]

KEY_ALT_NAMES_FIELD = "keyAltNames"

class TestTutorials(unittest.TestCase):

    client = pymongo.MongoClient(os.getenv("MONGODB_URI"))

    def _dropData(self):
        self.client[DB_NAME][COLLECTION_NAME].drop()
        self.client[KEY_VAULT_DB][KEY_VAULT_COLL].drop()

        for c in FLE2_ENC_COLLS:
            self.client[DB_NAME][c].drop()

    def startTestRun(self):
        self._dropData()

    def setUp(self):
        os.chdir(CURRENT_DIRECTORY)
        self._dropData()

    def tearDown(self):
        self._dropData()

    def _check_index(self):
        """Ensure index on Key Alt Names field exists"""

        test_data_key_ids_document = {KEY_ALT_NAMES_FIELD : ["AltNameToTestForIndex"]}
        test_data_key_ids_document_copy = test_data_key_ids_document.copy()
        self.client[KEY_VAULT_DB][KEY_VAULT_COLL].insert_one(test_data_key_ids_document)
        # make sure inserting a document with duplicate key alt name raises an error
        with self.assertRaises(pymongo.errors.DuplicateKeyError):
            self.client[KEY_VAULT_DB][KEY_VAULT_COLL].insert_one(test_data_key_ids_document_copy)

        self.client[KEY_VAULT_DB][KEY_VAULT_COLL].delete_one(test_data_key_ids_document)

    def _check_docs(self, project):
        """Checks that expected documents were added to key vault and collection and that fields were encrypted"""

        if project in FLE_2_LANGS:
            self.assertEqual(
                self.client[KEY_VAULT_DB][KEY_VAULT_COLL].count_documents({}),
                NUM_QE_DEKS,
            )
            self.assertEqual(
                self.client[DB_NAME][COLLECTION_NAME].count_documents(
                    {"firstName": "Jon"}
                ),
                1,
            )
            self.assertEqual(
                type(
                    self.client[DB_NAME][COLLECTION_NAME].find_one(
                        {"firstName": "Jon"}
                    )[TEST_FLE2_ENC_FIELD]
                ),
                type(BSON_BINARY_VALUE),
                f"{TEST_FLE2_ENC_FIELD} must be encrypted",
            )
        elif project in FLE_1_LANGS:
            self.assertEqual(
                self.client[KEY_VAULT_DB][KEY_VAULT_COLL].count_documents({}), 1
            )
            self.assertEqual(
                self.client[DB_NAME][COLLECTION_NAME].count_documents(
                    {"name": "Jon Doe"}
                ),
                1,
            )
            self.assertEqual(
                type(
                    self.client[DB_NAME][COLLECTION_NAME].find_one({"name": "Jon Doe"})[
                        TEST_FLE1_ENC_FIELD
                    ]
                ),
                type(BSON_BINARY_VALUE),
                f"{TEST_FLE1_ENC_FIELD} must be encrypted",
            )
        else:
            raise ValueError(f"Project not in either of the following:\nFLE_1_LANGS: {FLE_1_LANGS}\nFLE_2_LANGS: {FLE_2_LANGS}")

    def _check_app(self, project):
        """Build and test a sample application"""

        make_dek_file_name = None
        insert_file_name = None
        commands = []
        if project == PYTHON or project == PYTHON_FLE_2:
            make_dek_file_name = FILE_MAP[project][DEK]
            insert_file_name = FILE_MAP[project][INSERT]
            commands.append(f"python {make_dek_file_name}")
            commands.append(f"python {insert_file_name}")
        elif project == JAVA or project == JAVA_FLE_2:
            make_dek_file_name = os.path.splitext(
                ntpath.basename(FILE_MAP[project][DEK])
            )[0]
            insert_file_name = os.path.splitext(
                ntpath.basename(FILE_MAP[project][INSERT])
            )[0]
            commands.append(
                f'mvn compile exec:java -Dexec.mainClass="com.mongodb.csfle.{make_dek_file_name}"'
            )
            commands.append(
                f'mvn compile exec:java -Dexec.mainClass="com.mongodb.csfle.{insert_file_name}"'
            )
        elif project == CSHARP or project == CSHARP_FLE_2:
            os.chdir("CSFLE")
            commands.append("dotnet run")
        elif project == NODE or project == NODE_FLE_2:
            make_dek_file_name = FILE_MAP[project][DEK]
            insert_file_name = FILE_MAP[project][INSERT]
            commands.append("npm install")
            commands.append(f"node {make_dek_file_name}")
            commands.append(f"node {insert_file_name}")
        elif project == GO or project == GO_FLE_2:
            make_dek_file_name = FILE_MAP[project][DEK]
            insert_file_name = FILE_MAP[project][INSERT]
            commands.append("go get .")
            commands.append(f"go fmt {make_dek_file_name}")
            commands.append(f"go fmt {insert_file_name}")
            commands.append("go run -tags=cse .")
        else:
            Exception("Failed to Handle project")
        for c in commands:
            print(c)
            os.system(c)

        # only check indexes of apps that create this index. eventually all apps should
        # create this index, put at present only these apps do this
        if project in [PYTHON_FLE_2, JAVA_FLE_2, NODE_FLE_2, CSHARP_FLE_2, GO_FLE_2]:
            self._check_index()
        
        self._check_docs(project)


class TestPython(TestTutorials):
    """Test Python FLE1 Sample Apps"""

    def test_python_aws(self):
        os.chdir(os.path.join(BUILD_DIR, PYTHON, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(PYTHON)

    def test_python_azure(self):
        os.chdir(os.path.join(BUILD_DIR, PYTHON, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(PYTHON)

    def test_python_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, PYTHON, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(PYTHON)

    def test_python_local(self):
        os.chdir(os.path.join(BUILD_DIR, PYTHON, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(PYTHON)


class TestPythonFLE2(TestTutorials):
    """Test Python FLE2 Sample Apps"""

    def test_python_fle_2_aws(self):
        os.chdir(os.path.join(BUILD_DIR, PYTHON_FLE_2, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(PYTHON_FLE_2)

    def test_python_fle_2_azure(self):
        os.chdir(
            os.path.join(BUILD_DIR, PYTHON_FLE_2, *AZURE_TEST.split(DIR_SEPERATOR))
        )
        self._check_app(PYTHON_FLE_2)

    def test_python_fle_2_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, PYTHON_FLE_2, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(PYTHON_FLE_2)

    def test_python_fle_2_local(self):
        os.chdir(
            os.path.join(BUILD_DIR, PYTHON_FLE_2, *LOCAL_TEST.split(DIR_SEPERATOR))
        )
        self._check_app(PYTHON_FLE_2)

class TestDotnet(TestTutorials):
    """Test Dotnet FLE1 Sample Apps"""

    def test_dotnet_aws(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP)

    def test_dotnet_azure(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP)

    def test_dotnet_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP)

    def test_dotnet_local(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP)

class TestDotnetFLE2(TestTutorials):
    """Test Dotnet FLE2 Sample Apps"""

    def test_dotnet_fle_2_aws(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP_FLE_2, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP_FLE_2)

    def test_dotnet_fle_2_azure(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP_FLE_2, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP_FLE_2)

    def test_dotnet_fle_2_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP_FLE_2, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP_FLE_2)

    def test_dotnet_fle_2_local(self):
        os.chdir(os.path.join(BUILD_DIR, CSHARP_FLE_2, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(CSHARP_FLE_2)

class TestNode(TestTutorials):
    """Test Node FLE1 Sample Apps"""

    def test_node_aws(self):
        os.chdir(os.path.join(BUILD_DIR, NODE, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE)

    def test_node_azure(self):
        os.chdir(os.path.join(BUILD_DIR, NODE, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE)

    def test_node_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, NODE, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE)

    def test_node_local(self):
        os.chdir(os.path.join(BUILD_DIR, NODE, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE)

class TestNodeFLE2(TestTutorials):
    """Test Node FLE2 Sample Apps"""

    def test_node_fle_2_aws(self):
        os.chdir(os.path.join(BUILD_DIR, NODE_FLE_2, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE_FLE_2)

    def test_node_fle_2_azure(self):
        os.chdir(os.path.join(BUILD_DIR, NODE_FLE_2, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE_FLE_2)

    def test_node_fle_2_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, NODE_FLE_2, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE_FLE_2)

    def test_node_fle_2local(self):
        os.chdir(os.path.join(BUILD_DIR, NODE_FLE_2, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(NODE_FLE_2)


class TestGo(TestTutorials):
    """Test Go FLE1 Sample Apps"""

    def test_go_aws(self):
        os.chdir(os.path.join(BUILD_DIR, GO, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO)

    def test_go_azure(self):
        os.chdir(os.path.join(BUILD_DIR, GO, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO)

    def test_go_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, GO, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO)

    def test_go_local(self):
        os.chdir(os.path.join(BUILD_DIR, GO, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO)

class TestGoFLE2(TestTutorials):
    """Test Go FLE1 Sample Apps"""

    def test_go_fle_2_aws(self):
        os.chdir(os.path.join(BUILD_DIR, GO_FLE_2, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO_FLE_2)

    def test_go_fle_2_azure(self):
        os.chdir(os.path.join(BUILD_DIR, GO_FLE_2, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO_FLE_2)

    def test_go_fle_2_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, GO_FLE_2, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO_FLE_2)

    def test_go_fle_2_local(self):
        os.chdir(os.path.join(BUILD_DIR, GO_FLE_2, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(GO_FLE_2)

class TestJava(TestTutorials):
    """Test Java FLE1 Sample Apps"""

    def test_java_aws(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA)

    def test_java_azure(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA)

    def test_java_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA)

    def test_java_local(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA)

class TestJavaFLE2(TestTutorials):
    """Test Java FLE2 Sample Apps"""

    def test_java_fle_2_aws(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA_FLE_2, *AWS_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA_FLE_2)

    def test_java_fle_2_azure(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA_FLE_2, *AZURE_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA_FLE_2)

    def test_java_fle_2_gcp(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA_FLE_2, *GCP_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA_FLE_2)

    def test_java_fle_2_local(self):
        os.chdir(os.path.join(BUILD_DIR, JAVA_FLE_2, *LOCAL_TEST.split(DIR_SEPERATOR)))
        self._check_app(JAVA_FLE_2)

