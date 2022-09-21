import React from 'react';
import CustomInput from '../components/CustomInput';
import SelectMenu from '../components/SelectMenu';
import { newUser } from '../redux/users';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from 'modal-p14-tp';
import 'modal-p14-tp/dist/index.css'

const Home = () => {
	const dispatch = useDispatch();

	const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

	const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

	const [modal, setModal] = React.useState(false);

	// récupérer les données du form
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		const object = {};
		data.forEach((value, key) => {
			object[key] = value;
		});
		dispatch(newUser(object))
		setModal(true);
	}

	function handleModal() {
		setModal(false);
	}

	return (
		<div className='container mx-auto p-5'>
			<NavLink to="/users" className='absolute top-0 left-0 p-2 m-2 font-bold rounded bg-gray-500/50 border-white text-white'>Current Employees</NavLink>
			<h1 className='text-4xl font-bold text-center mb-10'>Create Employee</h1>
			<form 
				className='space-y-6'
				onSubmit={ handleSubmit }
			>
				<div className="grid gap-6 md:grid-cols-2">
					<CustomInput type="text" label="First name" name="firstName" placeholder="John" required={ true } />
					<CustomInput type="text" label="Last name" name="lastName" placeholder="Doe" required={ true } />
					<CustomInput type="date" label="Date of Birth" name="dateOfBirth" placeholder="Date of Birth" required={ true } />
					<CustomInput type="date" label="Start Date" name="startDate" placeholder="Start Date" required={ true } />
					<div className='relative bg-blue-400/20 border border-blue-900 rounded col-span-2 p-5 pt-10 grid gap-6 md:grid-cols-2'>
						<p className='absolute text-blue-900 font-bold top-1 left-5'>Address</p>
						<CustomInput type="text" label="Street" name="street" placeholder="Street" required={ true } />
						<CustomInput type="text" label="City" name="city" placeholder="City" required={ true } />
						<SelectMenu label="State" name="state" options={states} />
						<CustomInput type="number" label="Zip Code" name="zipCode" placeholder="XXXXX" required={ true } />
					</div>
				</div>
				<SelectMenu label="Department" name="department" options={departments} />
				<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
			</form>
			{ modal && <Modal text="Employee Created!" close={ handleModal } /> }
		</div>
	);
};

export default Home;