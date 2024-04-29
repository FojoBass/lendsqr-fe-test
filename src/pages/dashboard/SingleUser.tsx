import { useEffect, useMemo } from 'react';
import { useGlobalContext } from '../../contexts/appContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserInfoInt } from '../../types';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Avi, Star, StarFilled } from '../../icons';
import { LiaTimesSolid } from 'react-icons/lia';
import { IoCheckmark } from 'react-icons/io5';

const SingleUser = () => {
  const { isAuthed } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useMemo<UserInfoInt | null>(() => {
    const users: UserInfoInt[] = JSON.parse(
      localStorage.getItem('lendsqr_users')!
    );
    return users.find((user) => user.id === id) ?? null;
  }, [id]);
  const navArr = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
  ];

  const tierArr = useMemo(() => {
    let modArr = ['', '', ''];
    if (user) {
      for (let i = 0; i < user.personal.tier; i++) {
        modArr[i] = 'f';
      }
    }
    return modArr;
  }, [user]);

  useEffect(() => {
    isAuthed || navigate('/');
  }, []);

  return (
    isAuthed && (
      <div className='dash_user'>
        {!user ? (
          <p className='empty_user'>
            User not found! <Link to='/dashboard'>Return back</Link>{' '}
          </p>
        ) : (
          <div className='dash_user_main'>
            <header>
              <Link className='back_btn' to='/dashboard'>
                <span className='icon'>
                  <FaArrowLeftLong />
                </span>{' '}
                Back to Users{' '}
              </Link>

              <h1>
                User Details
                <div className='btns_wrapper'>
                  <button className='blacklist_btn'>
                    <span className='text'>blacklist user</span>
                    <span className='icon'>
                      <LiaTimesSolid />
                    </span>
                  </button>
                  <button className='activate_btn'>
                    <span className='text'>activate user</span>
                    <span className='icon'>
                      <IoCheckmark />
                    </span>
                  </button>
                </div>
              </h1>

              <div className='user_card'>
                <div className='top'>
                  <div className='avi_wrapper'>
                    <Avi />
                  </div>

                  <div className='top_info'>
                    <div className='seg'>
                      <h3 className='name'>{user.personal.fullName}</h3>
                      <p className='id'>{user.id}</p>

                      <div className='stars_wrapper mobile'>
                        {tierArr.map((f, ind) => (
                          <span className='star' key={ind}>
                            {f ? <StarFilled /> : <Star />}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='seg'>
                      <h5>user's tier</h5>
                      <div className='stars_wrapper'>
                        {tierArr.map((f, ind) => (
                          <span className='star' key={ind}>
                            {f ? <StarFilled /> : <Star />}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className='seg'>
                      <h3>₦200,000.00</h3>
                      <p>9912345678/providus bank</p>
                    </div>
                  </div>
                </div>

                <div className='bottom'>
                  {navArr.map((nav, ind) => (
                    <button className={`opt ${!ind ? 'active' : ''}`} key={nav}>
                      {nav}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            <div className='more_info'>
              <div className='info_opt'>
                <h5 className='title'>Personal Information</h5>

                <div className='opts_wrapper'>
                  <InfoOpt title='full name' val={user.personal.fullName} />

                  <InfoOpt
                    title='phone number'
                    val={user.personal.phoneNumber}
                  />

                  <InfoOpt title='email address' val={user.personal.email} />

                  <InfoOpt title='bvn' val={user.personal.bvn} />

                  <InfoOpt title='gender' val={user.personal.gender} />

                  <InfoOpt
                    title='marital status'
                    val={user.personal.maritalStatus}
                  />

                  <InfoOpt
                    title='children'
                    val={
                      user.personal.children
                        ? user.personal.children.toString()
                        : 'None'
                    }
                  />

                  <InfoOpt
                    title='type of residence'
                    val={user.personal.address}
                  />
                </div>
              </div>

              <div className='info_opt'>
                <h5 className='title'>Education and Employment</h5>

                <div className='opts_wrapper'>
                  <InfoOpt
                    title='level of education'
                    val={user.educationEmployment.educationLevel}
                  />

                  <InfoOpt
                    title='employment status'
                    val={user.educationEmployment.employmentStatus}
                  />

                  <InfoOpt
                    title='sector of employment'
                    val={user.educationEmployment.employmentSector}
                  />

                  <InfoOpt
                    title='duration of employment'
                    val={user.educationEmployment.employmentDuration + ' years'}
                  />

                  <InfoOpt
                    title='office email'
                    val={user.educationEmployment.email}
                  />

                  <InfoOpt
                    title='monthly income'
                    val='₦200,000.00 - ₦400,000.00'
                  />

                  <InfoOpt
                    title='loan repayment'
                    val={user.educationEmployment.loanRepayment.toString()}
                  />
                </div>
              </div>

              <div className='info_opt'>
                <h5 className='title'>Guarantor</h5>

                <div className='opts_wrapper'>
                  {user.guarantors.map((info) => (
                    <div className='info_opt_wrapper' key={info.fullName}>
                      <InfoOpt title='full name' val={info.fullName} />
                      <InfoOpt title='phone number' val={info.phoneNumber} />
                      <InfoOpt title='email address' val={info.email} />
                      <InfoOpt
                        title='relationship'
                        val={info.relationship}
                        style={{ textTransform: 'capitalize' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default SingleUser;

const InfoOpt = ({
  title,
  val,
  isBorder = false,
  style,
}: {
  title: string;
  val: string;
  isBorder?: boolean;
  style?: any;
}) => {
  return (
    <div className={`opt ${isBorder ? 'border' : ''}`}>
      <div className='title'>{title}</div>
      <h5 className='val' style={style ? style : {}}>
        {val}
      </h5>
    </div>
  );
};
