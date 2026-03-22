import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchPeople = () => {
    fetch("http://localhost:8080/api/people")
      .then(res => res.json())
      .then(data => setData(data));
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const addPerson = () => {
    if (!name || !email) return;

    fetch("http://localhost:8080/api/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_name: name, email: email }),
    }).then(() => {
      setName("");
      setEmail("");
      fetchPeople();
    });
  };

  const deletePerson = (id) => {
    fetch(`http://localhost:8080/api/people/${id}`, {
      method: "DELETE",
    }).then(() => fetchPeople());
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>People Management</h1>

      <div style={styles.card}>
        <h3>Add New Person</h3>
        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addPerson}>
            Add
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h3>People List</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.full_name}</td>
                <td>{p.email}</td>
                <td>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deletePerson(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "40px",
    marginBottom: "30px",
  },
  card: {
    background: "white",
    padding: "20px",
    margin: "20px auto",
    width: "60%",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
};

export default App;