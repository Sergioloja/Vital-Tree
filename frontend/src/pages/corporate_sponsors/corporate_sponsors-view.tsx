import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/corporate_sponsors/corporate_sponsorsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const Corporate_sponsorsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { corporate_sponsors } = useAppSelector(
    (state) => state.corporate_sponsors,
  );

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View corporate_sponsors')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View corporate_sponsors')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CompanyName</p>
            <p>{corporate_sponsors?.company_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Industry</p>
            <p>{corporate_sponsors?.industry}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CSRFocus</p>
            <p>{corporate_sponsors?.csr_focus}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Logo</p>
            {corporate_sponsors?.logo?.length ? (
              <ImageField
                name={'logo'}
                image={corporate_sponsors?.logo}
                className='w-20 h-20'
              />
            ) : (
              <p>No Logo</p>
            )}
          </div>

          <>
            <p className={'block font-bold mb-2'}>SponsoredProjects</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ProjectName</th>

                      <th>FundingGoal</th>

                      <th>CurrentFunding</th>

                      <th>StartDate</th>

                      <th>EndDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {corporate_sponsors.sponsored_projects &&
                      Array.isArray(corporate_sponsors.sponsored_projects) &&
                      corporate_sponsors.sponsored_projects.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/restoration_projects/restoration_projects-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='project_name'>{item.project_name}</td>

                          <td data-label='funding_goal'>{item.funding_goal}</td>

                          <td data-label='current_funding'>
                            {item.current_funding}
                          </td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!corporate_sponsors?.sponsored_projects?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/corporate_sponsors/corporate_sponsors-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Corporate_sponsorsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CORPORATE_SPONSORS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Corporate_sponsorsView;
