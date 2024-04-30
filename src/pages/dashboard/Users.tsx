import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usersCards } from '../../data';
import { MdFilterList } from 'react-icons/md';
import { UserInfoInt } from '../../types';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { dateHandler } from '../../helpers';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoEyeOutline } from 'react-icons/io5';
import { BiUserCheck, BiUserX } from 'react-icons/bi';
import { LiaTimesSolid } from 'react-icons/lia';
import {
  URLSearchParamsInit,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchErr, setFetchErr] = useState('');
  const [isFilterErr, setIsFilterErr] = useState(false);

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
      let modUsers: UserInfoInt[] = fetchUsers;

      for (const [key, value] of searchParams) {
        switch (key) {
          case 'org':
            if (value)
              modUsers = modUsers.filter(
                (user) => user.personal.organization === value
              );
            break;
          case 'uname':
            if (value)
              modUsers = modUsers.filter((user) =>
                user.personal.fullName
                  .toLowerCase()
                  .includes(value.trim().toLowerCase())
              );
            break;
          case 'email':
            if (value)
              modUsers = modUsers.filter((user) =>
                user.personal.email
                  .toLowerCase()
                  .includes(value.trim().toLowerCase())
              );
            break;
          case 'date':
            let [from, end] = value.split('|');
            if (from) {
              from = new Date(from).getTime().toString();
              end = end ? new Date(end).getTime().toString() : '';
              modUsers = modUsers.filter((user) => {
                const joined = new Date(user.personal.dateJoined).getTime();

                if (end) return joined >= Number(from) && joined <= Number(end);
                else return joined >= Number(from);
              });
            }

            break;
          case 'phoneNum':
            if (value)
              modUsers = modUsers.filter((user) =>
                user.personal.phoneNumber.includes(value.trim().toLowerCase())
              );
            break;
          case 'status':
            if (value)
              modUsers = modUsers.filter(
                (user) => user.personal.status === value
              );
            break;
          default:
            return;
        }
      }
      !modUsers.length && setIsFilterErr(true);
      setFilterUsers(modUsers);
    }
  }, [fetchUsers, searchParams]);

  useEffect(() => {
    if (fetchUsers.length)
      localStorage.setItem('lendsqr_users', JSON.stringify(fetchUsers));
  }, [fetchUsers]);

  useEffect(() => {
    if (filterUsers.length) {
      const start = (currPage - 1) * perPage;
      const end = currPage * perPage;

      let modUsers = filterUsers.slice(start, end);
      setDisplayUsers(modUsers);
    }
  }, [filterUsers, perPage, currPage]);

  useEffect(() => {
    (async () => {
      const storedUsers: UserInfoInt[] | null = localStorage.getItem(
        'lendsqr_users'
      )
        ? JSON.parse(localStorage.getItem('lendsqr_users')!)
        : null;

      if (storedUsers && storedUsers.length) {
        setFetchUsers(storedUsers);
        setIsLoading(false);
      } else {
        const res = await fetch(
          'https://mock.apidog.com/m1/521444-481610-default/lendersqr/users?apidogToken=5eTTdqdRdA2zCVyizjDNc'
        );
        try {
          const data = await res.json();
          localStorage.setItem('lendsqr_users', JSON.stringify(data));
          setFetchUsers(data);
        } catch (err) {
          setFetchErr('Check network connection');
        } finally {
          setIsLoading(false);
        }
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
                <div className='scroll_wrapper'>
                  <FaArrowLeftLong />
                  scroll
                  <FaArrowRightLong />
                </div>
                <div className='table_wrapper' ref={tableWrapperRef}>
                  <Filter
                    fetchUsers={fetchUsers}
                    state={isFilter}
                    left={filterLeft}
                    closer={setIsFilter}
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
                              <MoreActions
                                id={id}
                                setFetchUsers={setFetchUsers}
                              />
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
              (fetchErr || isFilterErr) && (
                <p className='empty_users'>
                  No users!
                  {fetchErr ? (
                    fetchErr
                  ) : (
                    <button
                      className='reset'
                      onClick={() => {
                        setIsFilterErr(false);
                        setSearchParams({});
                      }}
                    >
                      Reset Filters
                    </button>
                  )}
                </p>
              )
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
        <h1 className='skeleton_anim'></h1>

        <div className='cards_wrapper '>
          {usersCards.map(({ title }) => (
            <div className='card' key={title}>
              <div className='icon skeleton_anim'></div>
              <p className='title skeleton_anim'></p>
              <div className='count skeleton_anim'></div>
            </div>
          ))}
        </div>
      </header>

      <div className='bottom'>
        <div className='table_wrapper'>
          <table>
            <thead>
              <tr>
                <th>
                  <div className='cell_content skeleton_anim'></div>
                </th>
                <th>
                  <div className='cell_content skeleton_anim'></div>
                </th>
                <th>
                  <div className='cell_content skeleton_anim'></div>
                </th>
                <th>
                  <div className='cell_content skeleton_anim'></div>
                </th>
                <th>
                  <div className='cell_content skeleton_anim'></div>
                </th>
                <th>
                  <div className='cell_content skeleton_anim'></div>
                </th>
              </tr>
            </thead>

            <tbody>
              {new Array(10).fill('').map((val, ind) => (
                <tr key={val + ind}>
                  <td>
                    <p className='skeleton_anim'></p>
                  </td>
                  <td>
                    <p className='skeleton_anim'></p>
                  </td>
                  <td>
                    <p className='skeleton_anim'></p>
                  </td>
                  <td>
                    <p className='skeleton_anim'></p>
                  </td>
                  <td>
                    <p className='skeleton_anim'></p>
                  </td>
                  <td className='status '>
                    <span className='skeleton_anim'></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Filter = ({
  fetchUsers,
  state,
  left,
  closer,
}: {
  fetchUsers: UserInfoInt[];
  state: boolean;
  left: number;
  closer: Dispatch<SetStateAction<boolean>>;
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
  const [dateFrom, setDateFrom] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [status, setStatus] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleReset = () => {
    setSearchParams({});
    setOrganization('');
    setUsername('');
    setEmail('');
    setDateFrom('');
    setDateEnd('');
    setPhoneNum('');
    setStatus('');
    closer(false);
  };

  const handleFilter = () => {
    const modParam: URLSearchParamsInit = {
      org: organization,
      uname: username,
      email,
      date: `${dateFrom}|${dateEnd}`,
      phoneNum,
      status,
    };
    setSearchParams(modParam);
    closer(false);
  };

  useEffect(() => {
    for (const [key, value] of searchParams) {
      switch (key) {
        case 'org':
          if (value) setOrganization(value);
          break;
        case 'uname':
          if (value) setUsername(value);
          break;
        case 'email':
          if (value) setEmail(value);
          break;
        case 'date':
          if (value) {
            let [from, end] = value.split('|');
            from && setDateFrom(from);
            end && setDateEnd(end);
          }
          break;
        case 'phoneNum':
          if (value) setPhoneNum(value);
          break;
        case 'status':
          if (value) setStatus(value);
          break;
        default:
          return;
      }
    }
  }, []);

  return (
    <div
      className={`filter_sect ${state ? 'active' : ''}`}
      style={{ left: `${left}px` } as React.CSSProperties}
    >
      <div className='filter_opts'>
        <div className='filter_opt'>
          <label htmlFor='org'>organization</label>
          <select
            id='org'
            defaultValue={organization}
            onChange={(e) => setOrganization(e.target.value)}
          >
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
          <input
            type='text'
            id='username'
            placeholder='User'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='filter_opt'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='filter_opt'>
          <label htmlFor='date_from'>Date Start</label>
          <input
            type='date'
            id='date_from'
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div className='filter_opt'>
          <label htmlFor='date_to'>Date End</label>
          <input
            type='date'
            id='date_to'
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            disabled={!dateFrom}
          />
        </div>

        <div className='filter_opt'>
          <label htmlFor='phone'>Phone Number</label>
          <input
            type='tel'
            id='phone'
            placeholder='Phone Number'
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>

        <div className='filter_opt'>
          <label htmlFor='status'>Status</label>
          <select
            id='status'
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=''>Select</option>
            {statuses.map((stat) => (
              <option value={stat} key={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>

        <div className='btns_wrapper'>
          <button className='reset_btn' onClick={handleReset}>
            Reset
          </button>
          <button className='filter_btn' onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

const MoreActions = ({
  id,
  setFetchUsers,
}: {
  id: string;
  setFetchUsers: Dispatch<SetStateAction<UserInfoInt[]>>;
}) => {
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const changeStatus = (status: 'blacklisted' | 'active') => {
    setFetchUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, personal: { ...user.personal, status } }
          : user
      )
    );
    setState(false);
  };

  return (
    <td className='btn_wrapper'>
      <button className='more_btn' onClick={() => setState(!state)}>
        <span className='icon'>
          {state ? <LiaTimesSolid /> : <HiOutlineDotsVertical />}
        </span>
      </button>

      <div
        className={`moreaction ${state ? 'active' : ''}`}
        onMouseLeave={() => setState(false)}
      >
        <div className='moreaction_opts'>
          <button
            className='opt'
            onClick={() => {
              setState(false);
              navigate(`/dashboard/${id}`);
            }}
          >
            <span className='icon'>
              <IoEyeOutline />
            </span>
            view details
          </button>

          <button className='opt' onClick={() => changeStatus('blacklisted')}>
            <span className='icon'>
              <BiUserX />
            </span>
            blacklist user
          </button>

          <button className='opt' onClick={() => changeStatus('active')}>
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
