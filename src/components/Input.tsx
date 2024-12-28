export function Input({placeholder, reference, type, options} : { placeholder : string, reference? : any , type? : string, options?: Array<{value: string, label: string}>}) {
  return (
    <div className="flex flex-col ">
        {/* <label className="mb-2 text-gray-700 ">{text}</label> */}
        {type === 'select' ? (
            <select ref={reference} className="border border-gray-300 rounded-md p-2 mb-4 w-full">
                <option value="" disabled selected>{placeholder}</option>
                {options?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        ) : (
            <input 
                type={type}
                ref={reference} 
                placeholder={placeholder} 
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
        )}
    </div>
  )
}
