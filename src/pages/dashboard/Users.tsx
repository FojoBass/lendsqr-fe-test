import { useEffect, useState } from 'react';
import { usersCards } from '../../data';
import { MdFilterList } from 'react-icons/md';
import { UserInfoInt } from '../../types';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { dateHandler } from '../../helpers';

const Users = () => {
  const [fetchUsers, setFetchUsers] = useState<UserInfoInt[]>([]);
  const [displayUsers, setDisplayUsers] = useState<UserInfoInt[]>([]);
  const [filterUsers, setFilterUsers] = useState<UserInfoInt[]>([]);
  const [perPageArray] = useState([10, 20, 50, 100]);
  const [perPage, setPerPage] = useState<number>(perPageArray[1]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (fetchUsers.length) {
      let modUsers = fetchUsers;
      // todo run filter logic
      setFilterUsers(modUsers);
    }
  }, [fetchUsers]);

  useEffect(() => {
    if (filterUsers.length) {
      // !The start and end point will be determined by the page number
      let modUsers = filterUsers.slice(0, perPage);
      // todo all page logic goes here

      setDisplayUsers(modUsers);
    }
  }, [filterUsers, perPage]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://mock.apidog.com/m1/521444-481610-default/lendersqr/users?apidogToken=5eTTdqdRdA2zCVyizjDNc'
      );
      const data = await res.json();
      setFetchUsers(data);
      setIsLoading(false);
      sessionStorage.setItem('lendsqr_users', JSON.stringify(data));
    })();
  }, []);

  return (
    <div className='dash_users'>
      {isLoading ? (
        <UsersLoading />
      ) : (
        <div className='dash_users_main'>
          <header>
            <h1>Users</h1>

            <div className='cards_wrapper'>
              {usersCards.map(({ Icon, count, title }) => (
                <div className='card' key={title}>
                  <div className='icon'>
                    <Icon />
                  </div>
                  {title}
                  <div className='count'>
                    {parseInt(count).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </header>

          <div className='bottom'>
            {filterUsers.length ? (
              <>
                <div className='table_wrapper'>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className='cell_content'>
                            organization
                            <button className='filter'>
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            username
                            <button className='filter'>
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            email
                            <button className='filter'>
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            phone number
                            <button className='filter'>
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            date joined
                            <button className='filter'>
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            status
                            <button className='filter'>
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {displayUsers ? (
                        displayUsers.map(
                          ({
                            id,
                            personal: {
                              organization,
                              fullName,
                              email,
                              phoneNumber,
                              dateJoined,
                              status,
                            },
                          }) => (
                            <tr key={id}>
                              <td>{organization}</td>
                              <td>{fullName}</td>
                              <td>{email}</td>
                              <td>{phoneNumber}</td>
                              <td>{dateHandler(dateJoined)}</td>
                              <td className={`status ${status}`}>
                                <span>{status}</span>
                              </td>
                              <td className='btn_wrapper'>
                                <button className='more_btn'>
                                  <span className='icon'>
                                    <HiOutlineDotsVertical />
                                  </span>
                                </button>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <p className='empty_users'>No users!</p>
                      )}
                    </tbody>
                  </table>
                </div>

                <footer>
                  <div className='left_side'>
                    Showing
                    <select defaultValue={perPageArray[1]} id=''>
                      {perPageArray.map((val) => (
                        <option value={val} key={val}>
                          {val}
                        </option>
                      ))}
                    </select>{' '}
                    out of {filterUsers.length}
                  </div>
                  <div className='right_side'>PAGINATION</div>
                </footer>
              </>
            ) : (
              <p className='empty_users'>No users!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

const UsersLoading = () => {
  return (
    <div className='users_skeleton'>
      <header>
        <h1></h1>

        <div className='cards_wrapper'>
          {usersCards.map(({ title }) => (
            <div className='card' key={title}>
              <div className='icon'></div>
              <p className='title'></p>
              <div className='count'></div>
            </div>
          ))}
        </div>
      </header>

      <div className='bottom'></div>
    </div>
  );
};
