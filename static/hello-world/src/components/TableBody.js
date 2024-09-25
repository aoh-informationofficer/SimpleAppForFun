import React from 'react'

const TableBody = ({data}) => {
  return (
        <tbody>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                    <a href={`https://aocz.atlassian.net/wiki${item?._links?.webui}`} target="_blank">
                        {item.title}
                    </a>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={2}>Loading...</td>
                </tr>
            )}
        </tbody>
    );
}

export default TableBody
  