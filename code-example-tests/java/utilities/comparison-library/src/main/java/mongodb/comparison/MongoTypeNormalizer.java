package mongodb.comparison;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Minimal type normaliser used by {@link KernelBridge} to turn MongoDB / Java
 * values into JSON-serialisable equivalents the comparison kernel can consume.
 *
 * <p>The kernel handles every other normalisation step (MongoDB-shell syntax,
 * ellipsis, extended-JSON dates, etc.), so this helper is deliberately small:
 * it focuses on the BSON wrappers, dates and UUIDs that would otherwise serialise
 * to opaque Java {@code toString()} forms.
 */
public final class MongoTypeNormalizer {

    private MongoTypeNormalizer() {
        // utility class — no instances
    }

    /**
     * Recursively convert a value into a JSON-friendly representation:
     * <ul>
     *   <li>{@code null}                              → {@code null}</li>
     *   <li>{@link Date} / {@link Instant}             → {@code {"$date": <iso>}}</li>
     *   <li>{@link UUID}                              → string</li>
     *   <li>{@code org.bson.types.ObjectId}            → hex string (via reflection)</li>
     *   <li>{@code org.bson.types.Decimal128}          → string (via reflection)</li>
     *   <li>{@link Map}                                → recurse on values</li>
     *   <li>{@link List} / arrays                      → recurse on elements</li>
     *   <li>everything else                            → passed through unchanged</li>
     * </ul>
     */
    public static Object normalizeValue(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof String s) {
            return s;
        }
        if (value instanceof Number || value instanceof Boolean) {
            return value;
        }
        if (value instanceof Date date) {
            Map<String, String> dateObj = new HashMap<>();
            dateObj.put("$date", date.toInstant().toString());
            return dateObj;
        }
        if (value instanceof Instant instant) {
            Map<String, String> dateObj = new HashMap<>();
            dateObj.put("$date", instant.toString());
            return dateObj;
        }
        if (value instanceof UUID uuid) {
            return uuid.toString();
        }

        String className = value.getClass().getName();
        if ("org.bson.types.ObjectId".equals(className)) {
            try {
                return value.getClass().getMethod("toHexString").invoke(value);
            } catch (ReflectiveOperationException ignored) {
                return value.toString();
            }
        }
        if ("org.bson.types.Decimal128".equals(className)) {
            return value.toString();
        }

        if (value instanceof Map<?, ?> map) {
            Map<String, Object> normalized = new LinkedHashMap<>();
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                normalized.put(String.valueOf(entry.getKey()), normalizeValue(entry.getValue()));
            }
            return normalized;
        }
        if (value instanceof List<?> list) {
            List<Object> normalized = new ArrayList<>(list.size());
            for (Object item : list) {
                normalized.add(normalizeValue(item));
            }
            return normalized;
        }
        if (value.getClass().isArray()) {
            Object[] arr = (Object[]) value;
            List<Object> normalized = new ArrayList<>(arr.length);
            for (Object item : arr) {
                normalized.add(normalizeValue(item));
            }
            return normalized;
        }

        return value;
    }
}
