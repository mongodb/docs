import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentParser;
import dev.langchain4j.data.document.DocumentSplitter;
import dev.langchain4j.data.document.loader.UrlDocumentLoader;
import dev.langchain4j.data.document.parser.apache.pdfbox.ApachePdfBoxDocumentParser;
import dev.langchain4j.data.document.splitter.DocumentByCharacterSplitter;
import dev.langchain4j.data.segment.TextSegment;

import java.util.List;

public class PDFProcessor {

    /** Parses a PDF document from the specified URL, and returns a
     * langchain4j Document object.
     * */
    public static Document parsePDFDocument(String url) {
        DocumentParser parser = new ApachePdfBoxDocumentParser();
        return UrlDocumentLoader.load(url, parser);
    }

    /** Splits a parsed langchain4j Document based on the specified chunking
     * parameters, and returns an array of text segments.
     */
    public static List<TextSegment> splitDocument(Document document) {
        int maxChunkSize = 400; // number of characters
        int maxChunkOverlap = 20; // number of overlapping characters between consecutive chunks

        DocumentSplitter splitter = new DocumentByCharacterSplitter(maxChunkSize, maxChunkOverlap);
        return splitter.split(document);
    }
}
