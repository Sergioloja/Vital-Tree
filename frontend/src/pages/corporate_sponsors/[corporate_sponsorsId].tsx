import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/corporate_sponsors/corporate_sponsorsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCorporate_sponsors = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    company_name: '',

    industry: '',

    csr_focus: '',

    logo: [],

    sponsored_projects: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { corporate_sponsors } = useAppSelector(
    (state) => state.corporate_sponsors,
  );

  const { corporate_sponsorsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: corporate_sponsorsId }));
  }, [corporate_sponsorsId]);

  useEffect(() => {
    if (typeof corporate_sponsors === 'object') {
      setInitialValues(corporate_sponsors);
    }
  }, [corporate_sponsors]);

  useEffect(() => {
    if (typeof corporate_sponsors === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = corporate_sponsors[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [corporate_sponsors]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: corporate_sponsorsId, data }));
    await router.push('/corporate_sponsors/corporate_sponsors-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit corporate_sponsors')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit corporate_sponsors'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='CompanyName'>
                <Field name='company_name' placeholder='CompanyName' />
              </FormField>

              <FormField label='Industry'>
                <Field name='industry' placeholder='Industry' />
              </FormField>

              <FormField label='CSRFocus'>
                <Field name='csr_focus' placeholder='CSRFocus' />
              </FormField>

              <FormField>
                <Field
                  label='Logo'
                  color='info'
                  icon={mdiUpload}
                  path={'corporate_sponsors/logo'}
                  name='logo'
                  id='logo'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField
                label='SponsoredProjects'
                labelFor='sponsored_projects'
              >
                <Field
                  name='sponsored_projects'
                  id='sponsored_projects'
                  component={SelectFieldMany}
                  options={initialValues.sponsored_projects}
                  itemRef={'restoration_projects'}
                  showField={'project_name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/corporate_sponsors/corporate_sponsors-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCorporate_sponsors.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CORPORATE_SPONSORS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCorporate_sponsors;
