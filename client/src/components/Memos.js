import { useState, useEffect } from "react";
const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);
  const tableHeaderStyle = {
    fontSize: "100%",
    backgroundColor: "#96D4D4",
    border: "1px solid white",
    borderCollapse: "initial",
    padding: "7px",
    width: "25%",
  };
  
  const tableCellStyle = {
    fontSize: "100%",
    backgroundColor: "#96D4D4",
    border: "1px solid white",
    borderCollapse: "collapse",
    padding: "7px",
    width: "25%",
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px", marginBottom: "20px" }}>
      <p style={{ fontSize: "100%", fontWeight: "bold" }}>Past Donations</p>
      <div className="container-fluid" style={{ width: "100%" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Timestamp</th>
              <th style={tableHeaderStyle}>Message</th>
              <th style={tableHeaderStyle}>Address</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo) => (
              <tr key={Math.random()}>
                <td style={tableCellStyle}>{memo.name}</td>
                <td style={tableCellStyle}>
                  {new Date(memo.timestamp * 1000).toLocaleString()}
                </td>
                <td style={tableCellStyle}>{memo.message}</td>
                <td style={tableCellStyle}>{memo.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
};
export default Memos;