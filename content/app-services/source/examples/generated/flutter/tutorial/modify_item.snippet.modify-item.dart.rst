.. code-block:: dart
   :emphasize-lines: 2, 18-23, 32, 56, 67-74, 82-83, 85-86
   :caption: lib/components/modify_item.dart

   // ... other imports
   import 'package:flutter_todo/components/select_priority.dart';

   class ModifyItemForm extends StatefulWidget {
     final Item item;
     const ModifyItemForm(this.item, {Key? key}) : super(key: key);

     @override
     _ModifyItemFormState createState() => _ModifyItemFormState(item);
   }

   class _ModifyItemFormState extends State<ModifyItemForm> {
     final _formKey = GlobalKey<FormState>();
     final Item item;
     late TextEditingController _summaryController;
     late ValueNotifier<bool> _isCompleteController;

     late int? _priority;
     void _setPriority(int priority) {
       setState(() {
         _priority = priority;
       });
     }

     _ModifyItemFormState(this.item);

     @override
     void initState() {
       _summaryController = TextEditingController(text: item.summary);
       _isCompleteController = ValueNotifier<bool>(item.isComplete)
         ..addListener(() => setState(() {}));
       _priority = widget.item.priority;
       super.initState();
     }

     @override
     void dispose() {
       _summaryController.dispose();
       _isCompleteController.dispose();
       super.dispose();
     }

     @override
     Widget build(BuildContext context) {
       TextTheme myTextTheme = Theme.of(context).textTheme;
       final realmServices = Provider.of<RealmServices>(context, listen: false);
       return formLayout(
           context,
           Form(
               key: _formKey,
               child: Column(
                 mainAxisAlignment: MainAxisAlignment.center,
                 mainAxisSize: MainAxisSize.min,
                 children: <Widget>[
                   // ... Text and TextFormField widgets
                   SelectPriority(_priority ?? PriorityLevel.medium, _setPriority),
                   // ... StatefulBuilder widget
                   Padding(
                     padding: const EdgeInsets.only(top: 15),
                     child: Row(
                       mainAxisAlignment: MainAxisAlignment.center,
                       children: [
                         cancelButton(context),
                         deleteButton(context,
                             onPressed: () =>
                                 delete(realmServices, item, context)),
                         okButton(context, "Update",
                             onPressed: () async => await update(
                                 context,
                                 realmServices,
                                 item,
                                 _summaryController.text,
                                 _isCompleteController.value,
                                 _priority)),
                       ],
                     ),
                   ),
                 ],
               )));
     }

     Future<void> update(BuildContext context, RealmServices realmServices,
         Item item, String summary, bool isComplete, int? priority) async {
       if (_formKey.currentState!.validate()) {
         await realmServices.updateItem(item,
             summary: summary, isComplete: isComplete, priority: priority);
         Navigator.pop(context);
       }
     }

     void delete(RealmServices realmServices, Item item, BuildContext context) {
       realmServices.deleteItem(item);
       Navigator.pop(context);
     }
   }
