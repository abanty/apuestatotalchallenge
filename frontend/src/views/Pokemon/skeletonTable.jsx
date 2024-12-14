// MUI Imports
import Skeleton from '@mui/material/Skeleton'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const TableSkeleton = ({ rowsNum }) => {
    return Array.from(new Array(rowsNum)).map((_, index) => (
        // <tbody>
        //           <tr>
        //             <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
        //               No data available
        //             </td>
        //           </tr>
        //         </tbody>
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <Skeleton variant="text" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
            <TableCell>
                <Skeleton variant="text" />
            </TableCell>
        </TableRow>
    ));
}

export default TableSkeleton
