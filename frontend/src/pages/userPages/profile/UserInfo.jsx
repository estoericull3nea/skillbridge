import React, { useState } from 'react'

const UserInfo = () => {
  return (
    <div>
      <div></div>
      <form className='space-y-4 max-w-[500px] p-3'>
        <p className='mt-4 mb-1 ps-1 font-medium italic text-gray-500 font-xs'>
          Basic Credentials
        </p>
        {/* First Name */}
        <div className='flex gap-3'>
          <label className='form-control w-full '>
            <div className='label'>
              <span className='label-text'>First Name</span>
            </div>
            <input
              type='text'
              name='firstName'
              placeholder='Enter your first name'
              className='input input-bordered w-full '
              required
            />
          </label>

          {/* Last Name */}
          <label className='form-control w-full '>
            <div className='label'>
              <span className='label-text'>Last Name</span>
            </div>
            <input
              type='text'
              name='lastName'
              placeholder='Enter your last name'
              className='input input-bordered w-full '
            />
          </label>
        </div>

        {/* Email */}
        <label className='form-control w-full '>
          <div className='label'>
            <span className='label-text'>Email</span>
          </div>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            className='input input-bordered w-full '
            required
          />
        </label>

        {/* Password */}
        <label className='form-control w-full '>
          <div className='label'>
            <span className='label-text'>Password</span>
          </div>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            className='input input-bordered w-full '
          />
        </label>

        {/* Profile Picture */}
        <label className='form-control w-full '>
          <div className='label'>
            <span className='label-text'>Profile Picture URL</span>
          </div>
          <input
            type='text'
            name='picture'
            placeholder='Enter picture URL'
            className='input input-bordered w-full '
          />
        </label>

        {/* Role */}
        <label className='form-control w-full '>
          <div className='label'>
            <span className='label-text'>Role</span>
          </div>
          <select name='role' className='select select-bordered w-full '>
            <option value='customer'>Customer</option>
            <option value='admin'>Admin</option>
          </select>
        </label>

        {/* Is Verified */}
        <label className='form-control w-full  flex items-center gap-2'>
          <input type='checkbox' name='isVerified' className='checkbox' />
          <span className='label-text'>Is Verified</span>
        </label>

        {/* Active */}
        <label className='form-control w-full  flex items-center gap-2'>
          <input type='checkbox' name='active' className='checkbox' />
          <span className='label-text'>Active</span>
        </label>

        {/* Submit Button */}
        <button type='submit' className='btn btn-primary mt-4'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default UserInfo
