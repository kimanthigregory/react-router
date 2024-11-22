import "../routes/router.css";
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContacts } from "./contacts";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(); // Fetch all contacts
  // return { contacts, q }; // Return the contacts to the component

  const filteredContacts = q
    ? contacts.filter(
        (contact) =>
          contact.first.toLowerCase().includes(q.toLowerCase()) ||
          contact.last.toLowerCase().includes(q.toLowerCase())
      )
    : contacts;

  return { contacts: filteredContacts, q }; // Return the filtered c
}

export async function action() {
  const contact = await createContacts();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  return (
    <>
      {/* Loading Bar */}
      <div className="loading">
        <div
          id="loading-bar"
          className={navigation.state == "idle" ? "loading-visible" : ""}
        >
          .
        </div>
      </div>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                submit(event.currentTarget.forn);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
