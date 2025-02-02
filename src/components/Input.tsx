
export function Input({ placeholder, reference, type = "text" }: { placeholder: string, reference: any, type?: string }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            ref={reference}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500
                     bg-white dark:bg-gray-600 
                     border-gray-300 dark:border-gray-500
                     text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400"
        />
    );
}
