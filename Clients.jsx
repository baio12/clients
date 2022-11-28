import React, { useState, useEffect } from 'react';
import { PlusIcon, SearchIcon, UsersIcon } from '@heroicons/react/solid';
import Modal from './hooks/Modal';
import PrimaryButton from './hooks/PrimaryButton';
import AddClient from './AddClient';
import Input from './hooks/Input';
import Table from './hooks/Table';
import EmptyState from './hooks/EmptyState';
import Pagination from './hooks/Pagination';
import Alert from './hooks/Alert';
//import { getCustomers, deleteCustomer } from '../../apiClient/operations/customerOperations';
import useScrollPosition from './hooks/useScrollPosition';
import usePagination from './hooks/usePagination';
import Loader from './hooks/Loader';

const tableColumns = [
    { heading: 'Nombre o razón social', value: 'legal_name' },
    { heading: 'Correo electrónico', value: 'email' },
    { heading: 'RFC', value: 'tax_id' },
    { heading: 'Régimen fiscal', value: 'tax_system.name' }
]

const itemsLimitInTable = 20;

function Clients({ user }) {

    const [clients, setClients] = useState([]);
    const [openClientModal, setOpenClientModal] = useState(false);
    const [currentPage, setCurrenPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [editClient, setEditClient] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [clientsList, setClientsList] = useState([]);
    const setScrollPosition = useScrollPosition();
    const paginate = usePagination();

    /*const getCustomerList = async (limit, page) => {
        setIsLoadingData(true);
        setScrollPosition(0);
        try {
            const res = await getCustomers(user.organizationId, limit, page);
            setClients(res?.data?.customers);
            setPagination(paginate(res.total_items, itemsLimitInTable, res.total_pages));
            setIsLoadingData(false);
        } catch (e) {
            setIsLoadingData(false);
            setError(e.messageToUser);
        }
    }*/

    /*useEffect(() => {
        getCustomerList(itemsLimitInTable, currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);*/

    const handleDeleteClient = async item => {
        let tempClients = clients;
        try {
            setIsLoadingData(true);
            setClients([]);
            //await deleteCustomer(user?.organizationId, item.id);
            //getCustomerList(itemsLimitInTable, currentPage);
        } catch (e) {
            setClients(tempClients);
            setIsLoadingData(false);
            setError(e.messageToUser);
        }
    }

    const handleEditClient = item => {
        const client = clients.find(client => client.id === item.id);
        setEditClient(client);
        setOpenClientModal(true);
    }

    const actions = [
        {
            name: 'Editar',
            action: handleEditClient
        },
        {
            name: 'Eliminar',
            action: handleDeleteClient
        }
    ];

    const onClientAdded = async clientAdded => {
        setOpenClientModal(false);
        if (editClient) {
            setEditClient(null);
            let updatedClients = clients.filter(client => client.id !== clientAdded.id);
            setClients([
                clientAdded,
                ...updatedClients
            ]);
        } else {
            setClients([]);
            getCustomerList(itemsLimitInTable, currentPage);
        }
    }

    const onCancelAdded = () => {
        if (editClient) setEditClient(null);
        setOpenClientModal(false);
    }

    const handleSearch = value => {
        const filtered = clients.filter(item => {
            if (value == '') {
                return item
            } else if ( item.legal_name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || item.email.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || item.tax_id.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ) {
                return item
            } else {
                return ''
            }
        });
        setClientsList(filtered);
    }

    useEffect(() => {
        setClientsList(clients);
        return () => {
            setClientsList([]);
        }
    }, [clients]);

    return (
        <>
            <Loader show={isLoading} />
            {/* Calculate min height -> screen height minus top bar height*/}            
            <div className='min-h-full md:min-h-[calc(100vh-4rem)] bg-gray-200/70 px-4 lg:px-9 pt-6 pb-10'>
                {error &&
                    <div className='mb-5 top-[5.5rem] sticky z-50'>
                        <Alert title={error} show={error != null} onClose={() => setError(null)} />
                    </div>
                }
                <div className='flex justify-between'>
                    <h2 className='text-3xl font-bold text-gray-900'>
                        Clientes
                    </h2>
                    {clients.length > 0 && (
                        <PrimaryButton
                            onClick={() => setOpenClientModal(true)}>
                            <PlusIcon className='-ml-1 mr-3 h-5 w-5' />
                            <span className='block lg:hidden'>Agregar</span>
                            <span className='hidden lg:block'>Agregar nuevo cliente</span>
                        </PrimaryButton>
                    )}
                </div>
                <div className='w-full rounded-md lg:bg-white px-0 lg:px-9 py-0 lg:py-7 mt-4'>
                    {isLoadingData ? (
                        <Table title="Clientes agregados" columns={tableColumns} actionItems={actions} isLoadingData={isLoadingData} />
                    ) : (
                        <>
                            {clients.length > 0 ? (
                                <div>
                                    <div>
                                        <Input
                                            type="search"
                                            placeholder="Buscar"
                                            onChange={e => handleSearch(e.target.value)}
                                            leftIcon={<SearchIcon className='w-4 h-4 text-gray-400' />}
                                        />
                                    </div>
                                    <div className='w-full mt-4'>
                                        {clientsList.length > 0 ?
                                        <>
                                            <Table title="Clientes agregados" data={clientsList} columns={tableColumns} actionItems={actions} />
                                            <div className="lg:flex-1 lg:flex items-center justify-between pt-3">
                                                {pagination && (
                                                    <p className="select-none text-sm text-gray-700 hidden lg:block">
                                                        Mostrando {pagination.pages.find(element => element.page == currentPage).range.join(' a ')} de {pagination.totalItems} resultados
                                                    </p>
                                                )}
                                                <div>
                                                    <Pagination pages={pagination?.totalPages || pagination?.pages?.length} currentPage={currentPage} setCurrentPage={setCurrenPage} />
                                                </div>
                                            </div>
                                        </>
                                        :
                                            <div className='w-full'>
                                                <EmptyState icon={<SearchIcon className='w-12 h-12' />} title='No existen coincidencias' message='Inténtalo de nuevo con otra palabra.' />
                                            </div>
                                        }
                                        
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <EmptyState icon={<UsersIcon className='w-12 h-12' />} title='No hay clientes agregados' message='Comienza agregando clientes nuevos a la lista. Será la manerá más sencilla de facturar.' />
                                    <div className="mt-6">
                                        <PrimaryButton
                                            onClick={() => setOpenClientModal(true)}>
                                            <PlusIcon className='-ml-1 mr-3 h-5 w-5' />
                                            Agregar nuevo cliente
                                        </PrimaryButton>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div >
            <Modal open={openClientModal} setOpen={onCancelAdded} className='w-full sm:max-w-[30rem]'>
                <AddClient organizationId={user?.organizationId} client={editClient} onAdded={onClientAdded} onCancel={onCancelAdded} error={error} setIsLoading={setIsLoading} />
            </Modal>
        </>
    )
}

export default Clients;