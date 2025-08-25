.. code-block:: dart
   :emphasize-lines: 2, 17, 19-23, 39, 49
   :caption: lib/components/create_item.dart

   // ... other imports
   import 'package:flutter_todo/components/select_priority.dart';

   // ... CreateItemAction widget


   class CreateItemForm extends StatefulWidget {
     const CreateItemForm({Key? key}) : super(key: key);

     @override
     createState() => _CreateItemFormState();
   }

   class _CreateItemFormState extends State<CreateItemForm> {
     final _formKey = GlobalKey<FormState>();
     late TextEditingController _itemEditingController;
     int _priority = PriorityLevel.low;

     void _setPriority(int priority) {
       setState(() {
         _priority = priority;
       });
     }

     // ... initState() and dispose() @override functions

     @override
     Widget build(BuildContext context) {
       TextTheme theme = Theme.of(context).textTheme;
       return formLayout(
           context,
           Form(
             key: _formKey,
             child: Column(
               mainAxisAlignment: MainAxisAlignment.center,
               mainAxisSize: MainAxisSize.min,
               children: <Widget>[
                 // ... Text and TextFormField widgets
                 SelectPriority(_priority, _setPriority),
                 // ... Padding widget
               ],
             ),
           ));
     }

     void save(RealmServices realmServices, BuildContext context) {
       if (_formKey.currentState!.validate()) {
         final summary = _itemEditingController.text;
         realmServices.createItem(summary, false, _priority);
         Navigator.pop(context);
       }
     }
   }
