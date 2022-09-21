import { React, useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Arrow from '../components/icons/Arrow';
import ArrowDown from '../components/icons/ArrowDown';
import ArrowUp from '../components/icons/ArrowUp';

const Userlist = () => {
	const data = useSelector((state) =>	state.users.users);
	console.log('data', data);

	const [pageSize, setPageSize] = useState(10);
	const [indexStart, setIndexStart] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredData, setFilteredData] = useState('firstName');
	const [searchData, setSearchData] = useState('');
	const [columns, setColumns] = useState([
		{ title: 'First Name', data: 'firstName', state: 'asc' },
		{ title: 'Last Name', data: 'lastName', state: '' },
		{ title: 'Start Date', data: 'startDate', state: '' },
		{ title: 'Department', data: 'department', state: '' },
		{ title: 'Date of Birth', data: 'dateOfBirth', state: '' },
		{ title: 'Street', data: 'street', state: '' },
		{ title: 'City', data: 'city', state: '' },
		{ title: 'State', data: 'state', state: '' },
		{ title: 'Zip Code', data: 'zipCode', state: '' }
	]);

	function handleChangePageSize (event) {
		setPageSize(event.target.value);
		setCurrentPage(1);
		setIndexStart(0);
	}

	function classNav (index) {
		return index === currentPage ? 'z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700' : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
	}

	function nextPage () {
		if (currentPage < Math.round(data.length/pageSize)) {
			setCurrentPage(currentPage + 1);
			setIndexStart(indexStart + pageSize);
		}
	}

	function prevPage () {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			setIndexStart(indexStart - pageSize);
		}
	}

	// change state columns object with data as key
	function changeState (columnToChange) {
		const columnsTmp = [...columns];
		columnsTmp.forEach((column) => {
			if (column.data === columnToChange) {
				if (column.state === '') {
					column.state = 'asc';
				} else if (column.state === 'asc') {
					column.state = 'desc';
				} else if (column.state === 'desc') {
					column.state = 'asc';
				}
			} else {
				column.state = '';
			}
		});
		setColumns(columnsTmp);
		setFilteredData(columnToChange);
	}

	function displayedData() {
		return data
			.filter((item) => {
				return Object.keys(item).some((key) => {
					return item[key].toString().toLowerCase().includes(searchData);
				});
			})
			.sort((a, b) => {
				if(filteredData === 'zipCode') {
					return columns.find((column) => column.data === filteredData).state === 'asc' ? a[filteredData] - b[filteredData] : b[filteredData] - a[filteredData];
				} else {
					return columns.find((column) => column.data === filteredData).state === 'asc' ? a[filteredData].localeCompare(b[filteredData]) : b[filteredData].localeCompare(a[filteredData]);
				}
			});
	}

	return (
		<div className='container mx-auto px-5 py-10'>
			<NavLink to="/" className='absolute top-0 left-0 p-2 m-2 font-bold rounded bg-gray-500/50 border-white text-white'>Home</NavLink>
			<h1 className='text-4xl font-bold text-center mb-10'>Current Employees</h1>
			<div className="flex justify-between items-center pb-4">
					<div className='space-x-1'>
						<span>Show</span>
						<select
						 className="border border-gray-400 rounded"
						 onChange={handleChangePageSize}
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
						<span>entries</span>
					</div>
					<label htmlFor="table-search" className="sr-only">Search</label>
					<div className="relative">
							<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
								</svg>
							</div>
							<input
								type="text"
								id="table-search"
								className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Search for items"
								onChange={(e) => setSearchData(e.target.value)}
							/>
					</div>
			</div>

			<table className="w-full text-sm text-left relative shadow-md rounded overflow-hidden text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
									{columns.map((column, index) => (
										<th key={'colum-'+index} className="px-4 py-2">
											<button 
												className='flex items-center'
												onClick={() => { changeState(column.data); }}
											>
												{column.title}
												<div>
													{ column.state === '' && <Arrow/> }
													{ column.state === 'asc' && <ArrowUp/> }
													{ column.state === 'desc' && <ArrowDown/> }
												</div>
											</button>
										</th>
									))}
							</tr>
					</thead>
					<tbody>
						{displayedData().slice(indexStart, indexStart + pageSize).map((row, index) => (
							<tr key={'user-'+index} className="bg-white border-b">
								<td className="px-4 py-2">
									{row.firstName}
								</td>
								<td className="px-4 py-2">
									{row.lastName}
								</td>
								<td className="px-4 py-2">
									{row.startDate}
								</td>
								<td className="px-4 py-2">
									{row.department}
								</td>
								<td className="px-4 py-2">
									{row.dateOfBirth}
								</td>
								<td className="px-4 py-2">
									{row.street}
								</td>
								<td className="px-4 py-2">
									{row.city}
								</td>
								<td className="px-4 py-2">
									{row.state}
								</td>
								<td className="px-4 py-2">
									{row.zipCode}
								</td>
							</tr>
						))}
					</tbody>
			</table>

			<nav className="flex justify-between items-center pt-4" aria-label="Table navigation">
					<span className="text-sm font-normal text-gray-500">Showing <span className="font-semibold text-gray-900">{Number(indexStart + 1)} - {Number(indexStart + pageSize) < displayedData().length ? Number(indexStart + pageSize) : displayedData().length}</span> of <span className="font-semibold text-gray-900">{displayedData().length}</span></span>
					<ul className="inline-flex items-center -space-x-px">
							<li>
								<button 
									className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
								 	onClick={prevPage}
								>
									<span className="sr-only">Previous</span>
									<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
									</svg>
								</button>
							</li>
							{
								[...Array(Math.ceil(displayedData().length/pageSize))].map((e, i) => (
									<li key={'page-'+i}>
										<button 
											className={classNav(i+1)}
											onClick={() => { setCurrentPage(i + 1); setIndexStart((i) * pageSize) }}
										>
											{Number(i + 1)}
										</button>
									</li>
								))
							}
							<li>
								<button
								 className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
								 onClick={nextPage}
								>
									<span className="sr-only">Next</span>
									<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
									</svg>
								</button>
							</li>
					</ul>
			</nav>
		</div>
	);
};

export default Userlist;