import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { BiX, BiUserPlus } from 'react-icons/bi';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Modal } from 'components/Modal/Modal';
import css from 'components/App.module.css';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const initialContact = [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts) || initialContact;
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const nameIsExist = contacts.some(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    const numberIsExist = contacts.some(
      contact => contact.number.trim() === number.trim()
    );

    if (nameIsExist) {
      Notiflix.Report.warning(`${name} is already in contacts`);
      return;
    } else if (numberIsExist) {
      Notiflix.Report.warning(`${number} is already in contacts`);
      return;
    }

    setContacts([newContact, ...contacts]);
    toggleModal();
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className={css.container}>
        <h1 className={css.titleAplication}>
          Phone<span className={css.titleColor}>book</span>
        </h1>
        <button
          type="button"
          className={css.btnAddContact}
          onClick={toggleModal}
        >
          <BiUserPlus className={css.addModalIcon} size={25} />
        </button>
        {showModal && (
          <Modal onClose={toggleModal}>
            <h2 className={css.titleSection}>Add Contact</h2>
            <ContactForm onSubmit={addContact} />
            <button
              className={css.closeBtnModal}
              type="button"
              onClick={toggleModal}
            >
              <BiX className={css.closeBtnIcon} size={25} />
            </button>
          </Modal>
        )}

        <h2 className={css.titleSection}>Contacts</h2>

        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={getVisibleContact()}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts) || initialContact;
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(_, prevState) {
  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (nextContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }

  // addContact = ({ name, number }) => {
  //   const { contacts } = this.state;
  //   const newContact = {
  //     id: nanoid(),
  //     name,
  //     number,
  //   };

  //   const nameIsExist = contacts.some(
  //     contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
  //   );

  //   const numberIsExist = contacts.some(
  //     contact => contact.number.trim() === number.trim()
  //   );

  //   if (nameIsExist) {
  //     Notiflix.Report.warning(`${name} is already in contacts`);
  //     return;
  //   } else if (numberIsExist) {
  //     Notiflix.Report.warning(`${number} is already in contacts`);
  //     return;
  //   }

  //   this.setState(({ contacts }) => ({
  //     contacts: [newContact, ...contacts],
  //   }));
  //   this.toggleModal();
  // };

  // getVisibleContact = () => {
  //   const { contacts, filter } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // deleteContact = contactId => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //   }));
  // };

  // changeFilter = e => {
  //   this.setState({ filter: e.currentTarget.value });
  // };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  // render() {
  //   const { filter, showModal } = this.state;
  //   const visibleContacts = this.getVisibleContact();
  //   return (
  //     <>
  //       <div className={css.container}>
  //         <h1 className={css.titleAplication}>
  //           Phone<span className={css.titleColor}>book</span>
  //         </h1>
  //         <button
  //           type="button"
  //           className={css.btnAddContact}
  //           onClick={this.toggleModal}
  //         >
  //           <BiUserPlus className={css.addModalIcon} size={25} />
  //         </button>
  //         {showModal && (
  //           <Modal onClose={this.toggleModal}>
  //             <h2 className={css.titleSection}>Add Contact</h2>
  //             <ContactForm onSubmit={this.addContact} />
  //             <button
  //               className={css.closeBtnModal}
  //               type="button"
  //               onClick={this.toggleModal}
  //             >
  //               <BiX className={css.closeBtnIcon} size={25} />
  //             </button>
  //           </Modal>
  //         )}

  //         <h2 className={css.titleSection}>Contacts</h2>

  //         <Filter value={filter} onChange={this.changeFilter} />

  //         <ContactList
  //           contacts={visibleContacts}
  //           onDeleteContact={this.deleteContact}
  //         />
  //       </div>
  //     </>
  //   );
  // }
};
