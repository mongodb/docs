.. code-block:: dart
   :emphasize-lines: 17-25, 34-58
   :caption: lib/components/todo_item.dart

   // ... imports

   enum MenuOption { edit, delete }

   class TodoItem extends StatelessWidget {
     final Item item;

     const TodoItem(this.item, {Key? key}) : super(key: key);

     @override
     Widget build(BuildContext context) {
       final realmServices = Provider.of<RealmServices>(context);
       bool isMine = (item.ownerId == realmServices.currentUser?.id);
       return item.isValid
           ? ListTile(
               // ... leading property and child content
               title: Row(
                 children: [
                   Padding(
                     padding: const EdgeInsets.only(right: 8.0),
                     child: _PriorityIndicator(item.priority),
                   ),
                   SizedBox(width: 175, child: Text(item.summary)),
                 ],
               ),
               // ... subtitle, trailing, and shape properties with child content
             )
           : Container();
     }

     // ... handleMenuClick() function
   }

   class _PriorityIndicator extends StatelessWidget {
     final int? priority;
     const _PriorityIndicator(this.priority, {Key? key}) : super(key: key);
     Widget getIconForPriority(int? priority) {
       if (priority == PriorityLevel.low) {
         return const Icon(Icons.keyboard_arrow_down, color: Colors.blue);
       } else if (priority == PriorityLevel.medium) {
         return const Icon(Icons.circle, color: Colors.grey);
       } else if (priority == PriorityLevel.high) {
         return const Icon(Icons.keyboard_arrow_up, color: Colors.orange);
       } else if (priority == PriorityLevel.severe) {
         return const Icon(
           Icons.block,
           color: Colors.red,
         );
       } else {
         return const SizedBox.shrink();
       }
     }

     @override
     Widget build(BuildContext context) {
       return getIconForPriority(priority);
     }
   }
