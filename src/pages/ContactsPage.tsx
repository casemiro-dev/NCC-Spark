import { type FC } from "react";
import { ContactList } from "../components/contacts/ContactList";
import { Header } from "../components/layout/Header";

export const ContactsPage: FC = () => {
  return (
    <>
      <Header title="Contatos" />
      <ContactList />
    </>
  );
};
