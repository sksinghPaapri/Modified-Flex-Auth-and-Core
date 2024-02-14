import { React, useEffect, useState, useContext } from "react";
import "./account.css";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/molecules/Header";
import Footer from "../../components/molecules/Footer";
import { Alert, Container, Table } from "react-bootstrap";
import ApiService from "../../helpers/ApiServices";
import { TokenService } from "../../helpers/StorageServices";
import { UserContext } from "../../components/states/contexts/UserContext";
import constants from "../../helpers/Constants";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const findAllAccounts = async () => {
    ApiService.setHeader();
    ApiService.get("account")
      .then((response) => {
        setAccounts(response.data.documents);
      })
      .catch((err) => {
        navigate("/");
      });
  };

  const handleRowClick = (flexId) => {
    // window.location.replace(`https://${flexId}.app.pctflex.com/auth/?flexAuth=${TokenService.getToken()}`)
    window.location.replace(
      `http://localhost:3001/auth/auth/?flexAuth=${TokenService.getToken()}`
    );
  };

  useEffect(() => {
    findAllAccounts();
  }, []);

  return (
    <div className="accounts">
      <Header />

      <Container className="mt-4">
        <Alert variant="success">Please select a account.</Alert>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>COMPANY NAME</th>
              <th>FLEX ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => {
              return (
                <tr
                  key={account._id}
                  onClick={() => handleRowClick(account.flexId)}
                >
                  <td>{account?.name}</td>
                  <td>{account?.flexId}</td>
                  <td>
                    {" "}
                    <a
                      href={`https://${
                        account.flexId
                      }.app.pctflex.com/auth/?flexAuth=${TokenService.getToken()}`}
                    >
                      Select
                    </a>
                  </td>
                  {/* <td> <a href={`http://localhost:3001/auth/?flexAuth=${TokenService.getToken()}`}>Select</a></td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      {/* <Footer /> */}
    </div>
  );
};

export default Accounts;
