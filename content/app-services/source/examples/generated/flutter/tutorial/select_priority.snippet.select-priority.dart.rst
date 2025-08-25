.. code-block:: dart
   :caption: lib/components/select_priority.dart

   import 'package:flutter/material.dart';
   import 'package:flutter_todo/realm/realm_services.dart';

   class SelectPriority extends StatefulWidget {
     int priority;
     void Function(int priority) setFormPriority;

     SelectPriority(this.priority, this.setFormPriority, {Key? key})
         : super(key: key);

     @override
     State<SelectPriority> createState() => _SelectPriorityState();
   }

   class _SelectPriorityState extends State<SelectPriority> {
     @override
     Widget build(BuildContext context) {
       return Padding(
         padding: const EdgeInsets.only(top: 15),
         child: Column(
           crossAxisAlignment: CrossAxisAlignment.start,
           children: [
             const Text('Priority'),
             DropdownButtonFormField<int>(
               onChanged: ((int? value) {
                 final valueOrDefault = value ?? PriorityLevel.low;
                 widget.setFormPriority(valueOrDefault);
                 setState(() {
                   widget.priority = valueOrDefault;
                 });
               }),
               value: widget.priority,
               items: [
                 DropdownMenuItem(
                     value: PriorityLevel.low, child: const Text("Low")),
                 DropdownMenuItem(
                     value: PriorityLevel.medium, child: const Text("Medium")),
                 DropdownMenuItem(
                     value: PriorityLevel.high, child: const Text("High")),
                 DropdownMenuItem(
                     value: PriorityLevel.severe, child: const Text("Severe")),
               ],
             ),
           ],
         ),
       );
     }
   }
