import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/restoration_projects/restoration_projectsSlice';
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

const Restoration_projectsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { restoration_projects } = useAppSelector(
    (state) => state.restoration_projects,
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
        <title>{getPageTitle('View restoration_projects')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View restoration_projects')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ProjectName</p>
            <p>{restoration_projects?.project_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>FundingGoal</p>
            <p>{restoration_projects?.funding_goal || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CurrentFunding</p>
            <p>{restoration_projects?.current_funding || 'No data'}</p>
          </div>

          <FormField label='StartDate'>
            {restoration_projects.start_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  restoration_projects.start_date
                    ? new Date(
                        dayjs(restoration_projects.start_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No StartDate</p>
            )}
          </FormField>

          <FormField label='EndDate'>
            {restoration_projects.end_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  restoration_projects.end_date
                    ? new Date(
                        dayjs(restoration_projects.end_date).format(
                          'YYYY-MM-DD hh:mm',
                        ),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No EndDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {restoration_projects.description ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: restoration_projects.description,
                }}
              />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Images</p>
            {restoration_projects?.images?.length ? (
              <ImageField
                name={'images'}
                image={restoration_projects?.images}
                className='w-20 h-20'
              />
            ) : (
              <p>No Images</p>
            )}
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/restoration_projects/restoration_projects-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Restoration_projectsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_RESTORATION_PROJECTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Restoration_projectsView;
