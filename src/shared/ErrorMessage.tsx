import warning from '../assets/warning.png';
import React from 'react';

export const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className='flex mb-2'>
            <img className='w-4 h-4 mt-0.5 mr-2' src={warning} alt='warning' />
            <p className='text-red-500'>{message}</p>
        </div>
    );
};
