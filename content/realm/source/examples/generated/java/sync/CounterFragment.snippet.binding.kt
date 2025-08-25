val binding = CounterFragmentBinding.inflate(inflater, container, false).apply {
    lifecycleOwner = viewLifecycleOwner
    counterModel = model
}

binding.root.button.setOnClickListener {
    Log.v("QUICKSTART", "Clicked increment button. Current value: ${model.counter.value?.value?.get()}")
    model.incrementCounter()
}
return binding.root