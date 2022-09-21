import { React } from "react";

/**
* @param {object} props - Props
* @param {string} type - To assign input type
* @param {string} name - To customize input id and input placeholder
* @returns {component} - Input
*/

const CustomInput = ({ type, label, name, placeholder, required }) => {

	return (
		<div>
				<label 
					htmlFor={ name }
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					{ label }
				</label>
				<input 
					type={ type } 
					id={ name }
					name={ name }
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
					placeholder={ placeholder }
					required={ required }
				/>
		</div>
	);
};

export default CustomInput;