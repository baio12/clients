import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from './hooks/Input';
import PrimaryButton from './hooks/PrimaryButton';
import SecondaryButton from './hooks/SecondaryButton';
import SelectCustom from './hooks/SelectCustom';
import { rfcRegex, emailRegex, zipRegex, containsNumbersRegex } from './hooks/useRegex';
//import { getTaxRegimes } from '../../apiClient/operations/catalogs';
import Alert from './hooks/Alert';
//import { createCustomer, updateCustomer } from '../../apiClient/operations/customerOperations';

function AddClient({ organizationId, client, onAdded, onCancel, setIsLoading }) {

    const [regimeList, setRegimeList] = useState(null);
    const [regime, setRegime] = useState(client?.regime);
    const [filteredRegimeList, setFilteredRegimeList] = useState(null);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState(null);

   /*useEffect(() => {
        const getRegimeList = async () => {
            try {
                if (!regimeList) {
                    const res = await getTaxRegimes();
                    setFilteredRegimeList(res.data.tax_regimes);
                    setRegimeList(res.data.tax_regimes);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getRegimeList();
    }, [regimeList]);*/

    const filterRegimeList = (regimeList, taxPersonType) => {
        if (!regimeList) return null;
        if (taxPersonType) {
            return regimeList.reduce((filtered, item) => {
                if (item.type.includes(taxPersonType)) {
                    filtered.push({
                        id: item.regime_id,
                        name: item.name
                    });
                }
                return filtered;
            }, []);
        } else {
            return regimeList.map((regime) => ({
                id: regime.regime_id,
                name: regime.name
            }))
        }
    }

    useEffect(() => {
        //Filter regime list by rfc
        let taxPersonType;
        if (client?.tax_id?.length >= 4) taxPersonType = containsNumbersRegex(client.tax_id.slice(0,4)) ? 'enterprise' : 'personal';
        setFilteredRegimeList(filterRegimeList(regimeList, taxPersonType));
        setRegime(client?.tax_system?.name);
    }, [regimeList, client]);

    useEffect(() => {
        if (!errors) return;
        setErrors({ ...errors, regime: null });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regime]);

    const handleName = e => {
        const name = e.target.value;
        if (!errors) return;
        if (name == null || name == "") {
            setErrors({ ...errors, name: "Ingresa el nombre o razón social" });
        } else if (name.length < 3) {
            setErrors({ ...errors, name: "Ingresa correctamente el nombre o razón social" });
        } else {
            setErrors({ ...errors, name: null });
        }
    }

    const handleRfc = e => {
        const rfc = e.target.value.toUpperCase();
        e.target.value = rfc;
        //Filter regime list by rfc
        let taxPersonType;
        if (rfc?.length >= 4) taxPersonType = containsNumbersRegex(rfc.slice(0,4)) ? 'enterprise' : 'personal';
        setFilteredRegimeList(filterRegimeList(regimeList, taxPersonType));
        if (regime && taxPersonType && !(regimeList.find(item => item.name == regime)?.type?.includes(taxPersonType))) setRegime(null);

        if (!errors) return;
        if (rfc == null || rfc == "") {
            setErrors({ ...errors, rfc: "Ingresa el RFC" });
        } else if (!rfcRegex(rfc)) {
            setErrors({ ...errors, rfc: "Ingresa correctamente el RFC" });
        } else {
            setErrors({ ...errors, rfc: null });
        }
    }

    const handleEmail = e => {
        const email = e.target.value;
        if (!errors) return;
        if (email == null || email == "") {
            setErrors({ ...errors, email: "Ingresa el correo electrónico" });
        } else if (!emailRegex(email)) {
            setErrors({ ...errors, email: "Ingresa correctamente el correo electrónico" });
        } else {
            setErrors({ ...errors, email: null });
        }
    }

    const handleZip = e => {
        const zip = e.target.value;
        if (!errors) return;
        if (zip == null || zip == "") {
            setErrors({ ...errors, zip: "Ingresa el código postal" });
        } else if (!zipRegex(zip)) {
            setErrors({ ...errors, zip: "Ingresa correctamente el código postal" });
        } else {
            setErrors({ ...errors, zip: null });
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const rfc = e.target.elements.rfc.value;
        const email = e.target.elements.email.value;
        const zip = e.target.elements.zip.value;

        let err = {};

        if (name == null || name == "") {
            err.name = "Ingresa el nombre o razón social";
        } else if (name.length < 8) {
            err.name = "Ingresa correctamente el nombre o razón social";
        }

        if (rfc == null || rfc == "") {
            err.rfc = "Ingresa el RFC";
        } else if (!rfcRegex(rfc)) {
            err.rfc = "Ingresa correctamente el RFC";
        }

        if (regime == null || regime == "") err.regime = "Selecciona el régimen fiscal";

        if (email == null || email == "") {
            err.email = "Ingresa el correo electrónico";
        } else if (!emailRegex(email)) {
            err.email = "Ingresa correctamente el correo electrónico";
        }

        if (zip == null || zip == "") {
            err.zip = "Ingresa el código postal";
        } else if (!zipRegex(zip)) {
            err.zip = "Ingresa correctamente el código postal";
        }

        if (Object.keys(err).length === 0) {
            const regimeId = regimeList?.find(e => e.name == regime)?.regime_id;
            const data = {
                id: client?.id,
                name,
                rfc,
                regimeId,
                email,
                zip
            }
            if (client) {
                editCustomer(data, organizationId);
            } else {
                addCustomer(data, organizationId);
            }
        } else {
            setErrors(err);
        }
    }

    const addCustomer = async (client, organizationId) => {
        setIsLoading(true);
        setError(null);
        try {
            /*const customer = await createCustomer(
                client.name,
                client.regimeId,
                client.rfc,
                client.email,
                client.zip,
                organizationId
            );
            if (onAdded) onAdded(customer);*/
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setError(e.messageToUser);
        }
    }

    const editCustomer = async (client, organizationId) => {
        setIsLoading(true);
        setError(null);
        try {
            /*const customer = await updateCustomer(
                client.name,
                client.regimeId,
                client.rfc,
                client.email,
                client.zip,
                organizationId,
                client.id
            );
            if (onAdded) onAdded(customer);*/
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setError(e.messageToUser)
        }
    }

    const cancel = e => {
        e.preventDefault();
        if (onCancel) onCancel();
    }

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <div className="space-y-8">
                <div className="">
                    <div>
                        <h5 className='font-bold'>{client ? 'Editar cliente' : 'Agregar nuevo cliente'}</h5>
                        <div className='mt-5 -mx-6 border-t-2 border-gray-300' />
                    </div>
                    <div className="py-4 grid grid-cols-1 gap-y-4 gap-x-4 max-h-screen sm:max-h-[calc(100vh-300px)] overflow-y-auto -mx-6 px-6">
                        {error &&
                            <div className='mb-4 top-0 sticky z-50'>
                                <Alert title={error} show={error != null} onClose={() => setError(null)} />
                            </div>
                        }
                        <Input
                            label='Nombre o razón social'
                            type='text'
                            id='name'
                            onChange={handleName}
                            needed
                            defaultValue={client?.legal_name}
                            error={errors?.name} />
                        <Input
                            label='RFC'
                            type='text'
                            id='rfc'
                            onChange={handleRfc}
                            needed
                            maxLength={13}
                            defaultValue={client?.tax_id}
                            error={errors?.rfc} />
                        <SelectCustom
                            label='Régimen fiscal'
                            id='regime'
                            needed
                            value={regime}
                            setValue={setRegime}
                            listOptions={filteredRegimeList}
                            error={errors?.regime} />
                        <Input
                            label='Correo electrónico'
                            type='email'
                            id='email'
                            onChange={handleEmail}
                            needed
                            defaultValue={client?.email}
                            error={errors?.email} />
                        <Input
                            label='Código postal'
                            type='text'
                            inputMode='numeric'
                            id='zip'
                            onChange={handleZip}
                            needed
                            maxLength={5}
                            defaultValue={client?.address?.zip}
                            error={errors?.zip} />
                    </div>
                </div>
            </div>
            <div>
                <div className='mb-5 -mx-6 border-t-2 border-gray-300' />
                <div className="flex justify-end gap-5">
                    <SecondaryButton
                        type="button"
                        onClick={cancel}>
                        Cancelar
                    </SecondaryButton>
                    <PrimaryButton
                        type="submit">
                        {client ? 'Guardar' : 'Guardar cliente'}
                    </PrimaryButton>
                </div>
            </div>
        </form>
    )
}

AddClient.propTypes = {
    organizationId: PropTypes.string,
    client: PropTypes.object,
    onAdded: PropTypes.func,
    onCancel: PropTypes.func,
    setIsLoading: PropTypes.func
}

export default AddClient;