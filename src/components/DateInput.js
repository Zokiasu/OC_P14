import React from 'react';

const DateInput = ({label, placeholder, name}) => {
	return (
		<div>
			<label 
				htmlFor={ name } 
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{ label }
			</label>
			<input
				type="date" 
				id={ name }
				name={ name }
				className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 datepicker-input" 
				placeholder={ placeholder }
			/>
		</div>
	);
};

export default DateInput;