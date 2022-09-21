import React from 'react';

const SelectMenu = ({label, name, options}) => {
	return (
		<div>
			<label 
				htmlFor={ name } 
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{ label }
			</label>
			<select 
				id={ name }
				name={ name }
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			>
				<option defaultValue>Choose a option</option>
				{ 
					options.map((option, index) => (
						<option key={ index } value={ option }>{ option }</option>
					))
				}
			</select>
		</div>
	);
};

export default SelectMenu;