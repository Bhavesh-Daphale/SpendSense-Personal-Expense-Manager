import React , { useState , useEffect } from "react";
import './Expenses.css';
import ExpenseRow from "./ExpenseRow";

const ExpenseTable = ({expenses}) => {
    const [searchValue, setSearchValue] = useState('');    
  const [activeHeading, setActiveHeading] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);

    useEffect(() => {
      const table_rows = document.querySelectorAll('tbody tr');
  
      table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
          search_data = searchValue.toLowerCase();
  
        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
      });
    }, [searchValue]);

    const handleSort = (columnIndex) => {
        setActiveHeading(columnIndex);
    
        document.querySelectorAll('td').forEach((td) => td.classList.remove('active'));
        const table_rows = document.querySelectorAll('tbody tr');
        table_rows.forEach((row) => {
          row.querySelectorAll('td')[columnIndex].classList.add('active');
        });
    
        setSortAsc((prevSortAsc) => !prevSortAsc);
    
        sortTable(columnIndex, sortAsc);
      };
    
      const sortTable = (column, sortAsc) => {
        const table = document.querySelector('tbody');
        const table_rows = Array.from(table.querySelectorAll('tr'));
    
        table_rows
          .sort((a, b) => {
            let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
              second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();
    
            return sortAsc ? (first_row < second_row ? 1 : -1) : first_row < second_row ? -1 : 1;
          })
          .forEach((sorted_row) => table.appendChild(sorted_row));
      };

    return (
        <main className="table">
            <section className="table__header">
                <h2>Transactions</h2>
                <div className="input-search input-group">
                    <input type="search" placeholder="Search Data..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button type="search"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </section>
            <section className="table__body text-nowrap">
                <table>
                    <thead>
                        <tr>
                        <th className={activeHeading === 0 ? 'active' : ''} onClick={() => handleSort(0)}> Expense Name <span class="icon-arrow">&uarr;</span></th>
                        <th className={activeHeading === 1 ? 'active' : ''} onClick={() => handleSort(1)}> Category <span className="icon-arrow">&uarr;</span></th>
                        <th className={activeHeading === 2 ? 'active' : ''} onClick={() => handleSort(2)}> Date <span className="icon-arrow">&uarr;</span></th>
                        <th className={activeHeading === 3 ? 'active' : ''} onClick={() => handleSort(3)}> Type <span className="icon-arrow">&uarr;</span></th>
                        <th className={activeHeading === 4 ? 'active' : ''} onClick={() => handleSort(4)}> Amount <span className="icon-arrow">&uarr;</span></th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                        <ExpenseRow key={expense.id} expense={expense} />))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default ExpenseTable;