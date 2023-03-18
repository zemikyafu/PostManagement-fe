import React, { useState } from "react";
import Contacts from "../../components/contacts/contacts";
import Header from "../../components/shared/header";
import ManageContacts from "../../components/contacts/manage-contacts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./home.css";
import { ContactsContext } from "../../context/contacts.context";
import Notification from "../../components/shared/notification";

const Home = () => {
  const API_URL = "http://localhost:8080/api/contact";
  let config = {
    headers: {
      // "Access-Control-Allow-Origin": true,
      'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
    }}

  // const getContacts = async () => {
  //   console.log("token "+localStorage.getItem("accessToken"))
  //
  //   setContactState((prevState) => ({ ...prevState, loading: true }));
  //   await axios
  //       .get(API_URL+'/findContactByUserId/'+user.id,config)
  //       .then((res) => {
  //         setContactState((prevState) => ({ ...prevState, contacts: res.data }));
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() =>
  //           setContactState((prevState) => ({ ...prevState, loading: false }))
  //       );
  // };

  const getContacts = async () => {
    console.log("token "+localStorage.getItem("accessToken"))

    setContactState((prevState) => ({ ...prevState, loading: true }));
    await axios
        .get(API_URL+`/findContactByUserId/${user.id}`,config)
        .then((res) => {
          setContactState((prevState) => ({ ...prevState, contacts: res.data }));
        })
        .catch((err) => console.log(err))
        .finally(() =>
            setContactState((prevState) => ({ ...prevState, loading: false }))
        );
  };

  const submitContact = async (values) => {
    setContactState((prevState) => ({ ...prevState, saving: true }));

  //  const data = { ...values, userId: user.id };
 let data ={ "name": values.name, "email":values.email , "phone": values.phone, "type": values.type };

    await axios
      .post(API_URL+ "/creatContact", data, config)
      .then((res) => {
        if (res.status === 201) {
          getContacts();
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setContactState((prevState) => ({ ...prevState, saving: false }))
      );
  };

  const deleteContact = async (id) => {
    // console.log("id "+id);
    // console.log("config "+ JSON.stringify(config))
    await axios
      .delete( API_URL+`/deleteContact/${id}`,config)
      .then((res) => {
        if (res.status === 200) {
          getContacts();

        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setContactState((prevState) => ({ ...prevState, saving: false }))
      );
  };

  const editContact = async (values) => {
    const { id } = values;
    //const data = { ...values, userId: user.id };
    let data ={ "name": values.name, "email":values.email , "phone": values.phone, "type": values.type };

    await axios
      .put(API_URL+`/updateContact/${id}`, data, config)
      .then((res) => {
        if (res.status === 200) {
          getContacts();
          setEditMode({ status: false, data: null });
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setContactState((prevState) => ({ ...prevState, saving: false }))
      );
  };

  const searchContact = async (param) => {
    // await axios
    //   .get(
    //     `http://localhost:3001/contacts?userId=${user.id}&name_like=${param}`
    //   )
    //   .then((res) => {
    //     setContactState((prevState) => ({ ...prevState, contacts: res.data }));
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() =>
    //     setContactState((prevState) => ({ ...prevState, loading: false }))
    //   );
  };

  const setEditMode = (mode) =>
    setContactState((prevState) => ({ ...prevState, editMode: mode }));

  const logout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const [contactState, setContactState] = useState({
    loading: false,
    saving: false,
    editMode: { status: false, data: null },
    contacts: [],
    getContacts,
    submitContact,
    deleteContact,
    editContact,
    searchContact,
    setEditMode,
    logout,
  });

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.user);

  return (
    <ContactsContext.Provider value={contactState}>
      <div className="wrapper">
        <Header />
        <div className="container">
          {/*<Notification title={`Hello ${user.name} 🙂👋`} type="success" />*/}
            <Notification title={`Hello ${user.name} `} type="success" />
        </div>
        <div className="container d-flex flex-lg-row flex-column gap-5">
          <div className="flex-fill">
            <ManageContacts />
          </div>
          <div className="flex-fill">
            <Contacts />
          </div>
        </div>
      </div>
    </ContactsContext.Provider>
  );
};

export default Home;
