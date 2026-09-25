.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: cpp

         constexpr auto k_retryable_error_label = "RetryableError";
         constexpr auto k_system_overloaded_error_label = "SystemOverloadedError";

         bool is_system_overloaded_error(mongocxx::operation_exception const& e) {
           return e.has_error_label(k_system_overloaded_error_label);
         }
   
   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you 
      want to protect. The function does the following: 
         
      - Retries only overload errors that are safe to retry.

      - Waits longer between each attempt using `exponential backoff <https://en.wikipedia.org/wiki/Exponential_backoff>`_ 
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note:: 

         The following code uses arbitrary values for ``k_base_backoff``, ``k_max_backoff``, 
         and the exponential growth factor in ``calculate_exponential_backoff()``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: cpp

         using milliseconds_t = std::chrono::duration<double, std::milli>;
 
         constexpr auto k_base_backoff = milliseconds_t(100.0);
         constexpr auto k_max_backoff = milliseconds_t(10000.0);
         constexpr auto k_max_attempts_default = 2;

         double random_01() {
           static std::mt19937 gen(std::random_device{}());
           static std::uniform_real_distribution<double> dist(0.0, 1.0);
           return dist(gen);
         }

         milliseconds_t calculate_exponential_backoff(int attempt, milliseconds_t base_backoff) {
           return random_01() * std::min(k_max_backoff, base_backoff * std::pow(2.0, attempt));
         }

         // get_base_backoff returns the base backoff to apply for an overload error. A server may attach a
         // positive `baseBackoffMS` to the error to replace the default base backoff.
         milliseconds_t get_base_backoff(mongocxx::operation_exception const& e) {
           if (auto const& error_reply = e.raw_server_error()) {
             auto const elem = error_reply->view()["baseBackoffMS"];
 
             if (elem && (elem.type() == bsoncxx::type::k_int32 || elem.type() == bsoncxx::type::k_int64)) {
               auto const base_backoff_ms = elem.type() == bsoncxx::type::k_int32
                                             ? static_cast<std::int64_t>(elem.get_int32().value)
                                             : elem.get_int64().value;

               if (base_backoff_ms > 0) {
                 return milliseconds_t(static_cast<double>(base_backoff_ms));
               }
             }
           }

           return k_base_backoff;
         }

         using retryable_fn_t = std::function<void()>;

         void execute_with_retries(retryable_fn_t fn, int max_attempts = k_max_attempts_default) {
           auto base_backoff_ms = k_base_backoff;

           for (int attempt = 0; attempt < max_attempts; ++attempt) {
             auto const is_retry = attempt > 0;

             if (is_retry) {
               auto const delay = calculate_exponential_backoff(attempt, base_backoff_ms);
               std::this_thread::sleep_for(delay);
             }

             try {
               fn();
               return;

             } catch (mongocxx::operation_exception const& e) {
               auto const is_retryable_overload_error =
                 is_system_overloaded_error(e) && e.has_error_label(k_retryable_error_label);
               auto const can_retry = is_retryable_overload_error && attempt + 1 < max_attempts;

               // Apply the server-requested base backoff, if any, to the next attempt's delay.
               base_backoff_ms = get_base_backoff(e);

               if (!can_retry) {
                 throw;
               }
             }
           }
         }

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual operations,
      such as ``insert()`` or ``find()`` queries, with the ``execute_with_retries()`` function
      so that MongoDB retries overload errors with backoff and surfaces all 
      other errors immediately.

      For example, the following operation fetches all users from the
      ``users`` collection and processes each result. Without retry logic,
      an overload error ends the operation:

      .. code-block:: cpp

         int main() {
           using namespace bsoncxx::builder::basic;

           auto instance = mongocxx::instance();
           auto client = mongocxx::client(mongocxx::uri("mongodb://localhost:27017"));
           auto users_collection = client["db"]["users"];

           auto cursor = users_collection.find(make_document());
           for (auto const& res : cursor) {
             process_result(res);
           }
         }

      To retry the operation, pass it to ``execute_with_retries()`` as a
      lambda:

      .. code-block:: cpp

         int main() {
           using namespace bsoncxx::builder::basic;

           auto instance = mongocxx::instance();
           auto client = mongocxx::client(mongocxx::uri("mongodb://localhost:27017"));
           auto users_collection = client["db"]["users"];

           execute_with_retries([&]() {
             auto cursor = users_collection.find(make_document());
             for (auto const& res : cursor) {
               process_result(res);
             }
           });
         }
