import { useEffect, useMemo, useRef, useState } from 'react';
import { usersCards } from '../../data';
import { MdFilterList } from 'react-icons/md';
import { UserInfoInt } from '../../types';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { dateHandler } from '../../helpers';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { BiUserCheck, BiUserX } from 'react-icons/bi';

const Users = () => {
  const [fetchUsers, setFetchUsers] = useState<UserInfoInt[]>([]);
  const [displayUsers, setDisplayUsers] = useState<UserInfoInt[]>([]);
  const [filterUsers, setFilterUsers] = useState<UserInfoInt[]>([]);
  const [perPageArray] = useState([10, 20, 50, 100]);
  const [perPage, setPerPage] = useState<number>(perPageArray[1]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageArr, setPageArr] = useState<string[]>([]);
  const totalPages = useMemo<number>(() => {
    return Math.ceil(filterUsers.length / perPage);
  }, [filterUsers, perPage]);
  const [isFilter, setIsFilter] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const [filterLeft, setFilterLeft] = useState(30);

  useEffect(() => {
    let modPageArr: string[] = [];

    if (totalPages) {
      if (currPage > totalPages) setCurrPage(totalPages);
      else {
        if (totalPages >= 8) {
          if (currPage < 4)
            modPageArr = ['1', '2', '3', '4', '...', `${totalPages}`];

          if (currPage >= 4 && currPage < totalPages - 2) {
            const prev = currPage - 1;
            const next = currPage + 1;
            modPageArr = [
              '1',
              '...',
              `${prev}`,
              `${currPage}`,
              `${next}`,
              '...',
              `${totalPages}`,
            ];
          }

          if (currPage >= totalPages - 2)
            modPageArr = [
              '1',
              '...',
              `${totalPages - 3}`,
              `${totalPages - 2}`,
              `${totalPages - 1}`,
              `${totalPages}`,
            ];
        } else {
          for (let i = 1; i <= totalPages; i++) {
            modPageArr.push(`${i}`);
          }
        }

        setPageArr(modPageArr);
      }
    }
  }, [perPage, totalPages, currPage]);

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
      try {
        const data = await res.json();
        setFetchUsers(data);
        sessionStorage.setItem('lendsqr_users', JSON.stringify(data));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const twEl = tableWrapperRef.current;

    if (twEl) {
      const eventCallBack = () => {
        twEl.scrollLeft > 20 && setFilterLeft(10 + twEl.scrollLeft);
        twEl.scrollLeft === 0 && setFilterLeft(30);
      };

      twEl.addEventListener('scroll', eventCallBack);

      return () => twEl.removeEventListener('scroll', eventCallBack);
    }
  }, [filterUsers.length]);

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
                <div className='table_wrapper' ref={tableWrapperRef}>
                  <Filter
                    fetchUsers={fetchUsers}
                    state={isFilter}
                    left={filterLeft}
                  />
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className='cell_content'>
                            organization
                            <button
                              className='filter'
                              onClick={() => setIsFilter(!isFilter)}
                            >
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            username
                            <button
                              className='filter'
                              onClick={() => setIsFilter(!isFilter)}
                            >
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            email
                            <button
                              className='filter'
                              onClick={() => setIsFilter(!isFilter)}
                            >
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            phone number
                            <button
                              className='filter'
                              onClick={() => setIsFilter(!isFilter)}
                            >
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            date joined
                            <button
                              className='filter'
                              onClick={() => setIsFilter(!isFilter)}
                            >
                              <MdFilterList />
                            </button>
                          </div>
                        </th>
                        <th>
                          <div className='cell_content'>
                            status
                            <button
                              className='filter'
                              onClick={() => setIsFilter(!isFilter)}
                            >
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
                              {/* <td className='btn_wrapper'>
                                <button className='more_btn'>
                                  <span className='icon'>
                                    <HiOutlineDotsVertical />
                                  </span>
                                </button>
                              </td> */}
                              <MoreActions userId={id} />
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
                    <select
                      defaultValue={perPage}
                      id=''
                      onChange={(e) => setPerPage(parseInt(e.target.value))}
                    >
                      {perPageArray.map((val) => (
                        <option value={val} key={val}>
                          {val}
                        </option>
                      ))}
                    </select>{' '}
                    out of {filterUsers.length}
                  </div>

                  <div className='right_side'>
                    <button
                      className='prev_btn'
                      disabled={currPage === 1}
                      onClick={() => setCurrPage(currPage - 1)}
                    >
                      <IoIosArrowBack />
                    </button>
                    {pageArr.map((pg, ind) => (
                      <button
                        className={`pg_btn ${
                          pg === String(currPage) ? 'active' : ''
                        }`}
                        key={pg + ind}
                        disabled={pg === '...'}
                        onClick={() =>
                          pg !== '...' && setCurrPage(parseInt(pg))
                        }
                      >
                        {pg}
                      </button>
                    ))}
                    <button
                      className='next_btn'
                      disabled={currPage === totalPages}
                      onClick={() => setCurrPage(currPage + 1)}
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
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

const Filter = ({
  fetchUsers,
  state,
  left,
}: {
  fetchUsers: UserInfoInt[];
  state: boolean;
  left: number;
}) => {
  const [organizations] = useState([
    ...new Set(fetchUsers.map((user) => user.personal.organization)),
  ]);
  const [statuses] = useState([
    'active',
    'inactive',
    'blacklisted',
    'pending',
  ] as const);

  const [organization, setOrganization] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div
      className={`filter_sect ${state ? 'active' : ''}`}
      style={{ left: `${left}px` } as React.CSSProperties}
    >
      <div className='filter_opts'>
        <div className='filter_opt'>
          <label htmlFor='org'>organization</label>
          <select id='org' defaultValue={organization}>
            <option value='' disabled>
              Select
            </option>
            {organizations.map((org) => (
              <option value={org} key={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className='filter_opt'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' placeholder='User' />
        </div>

        <div className='filter_opt'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' placeholder='Email' />
        </div>

        <div className='filter_opt'>
          <label htmlFor='date_from'>Date Start</label>
          <input type='date' id='date_from' />
        </div>

        <div className='filter_opt'>
          <label htmlFor='date_to'>Date End</label>
          <input type='date' id='date_to' />
        </div>

        <div className='filter_opt'>
          <label htmlFor='phone'>Phone Number</label>
          <input type='tel' id='phone' placeholder='Phone Number' />
        </div>

        <div className='filter_opt'>
          <label htmlFor='status'>Status</label>
          <select id='status'>
            <option value=''>Select</option>
            {statuses.map((stat) => (
              <option value={stat} key={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>

        <div className='btns_wrapper'>
          <button className='reset_btn'>Reset</button>
          <button className='filter_btn'>Filter</button>
        </div>
      </div>
    </div>
  );
};

const MoreActions = ({ userId }: { userId: string }) => {
  // !Once component is setup, route view details
  // todo Make this component close once user clicks outside (mostly cause of mobile devices). Ensure to exclude both menu_btn and the container

  const [state, setState] = useState(false);

  return (
    <td className='btn_wrapper'>
      <button className='more_btn' onClick={() => setState(!state)}>
        <span className='icon'>
          <HiOutlineDotsVertical />
        </span>
      </button>

      <div
        className={`moreaction ${state ? 'active' : ''}`}
        onMouseLeave={() => setState(false)}
      >
        <div className='moreaction_opts'>
          <button className='opt'>
            <span className='icon'>
              <IoEyeOutline />
            </span>
            view details
          </button>

          <button className='opt'>
            <span className='icon'>
              <BiUserX />
            </span>
            blacklist user
          </button>

          <button className='opt'>
            <span className='icon'>
              <BiUserCheck />
            </span>
            activate user
          </button>
        </div>
      </div>
    </td>
  );
};
