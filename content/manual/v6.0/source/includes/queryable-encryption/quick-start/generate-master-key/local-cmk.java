import java.io.FileOutputStream;
import java.io.IOException;
import java.security.SecureRandom;

public class CreateMasterKeyFile {
    public static void main(String[] args) throws IOException {

        byte[] localMasterKey = new byte[96];
        new SecureRandom().nextBytes(localMasterKey);

        try (FileOutputStream stream = new FileOutputStream("master-key.txt")) {
            stream.write(localMasterKey);
        }
    }
}
