import { instance } from "./instance"

export const GetAllContacts = () => {
  return instance.get(`/contacts/`)
}

export const GetOneContact = (id) => {
  return instance.get(`/contact/?contact_id=${id}`)
}

export const GetOrigins = () => {
  return instance.get(`/origins/`)
}

export const GetContactType = () => {
  return instance.get(`/contact_types/`)
}

export const GetGender = () => {
  return instance.get(`/genders/`)
}

export const GetOneGender = (id) => {
  return instance.get(`/gender/?id=${id}`)
}

export const SetContact = (contact) => {
  return instance.post(`/contacts/`, contact)
}

export const PutContact = (contact) => {
  return instance.put(`/contacts/`, contact)
}

export const DelContact = (id) => {
  return instance.delete(`/contacts/${id}`)
}

export const GetComments = (id) => {
  return instance.get(`/comments/?contact_id=${id}`)
}

export const GetComment = (id) => {
  return instance.get(`/comment/?id_comment=${id}`)
}

export const GetTasks = (id) => {
  return instance.get(`/tasks/?id_contact=${id}`)
}

export const GetTask = (id) => {
  return instance.get(`/task/?id_task=${id}`)
}

export const SetTask = (task) => {
  return instance.post(`/tasks/`, task)
}

export const PutTasks = (task) => {
  return instance.put(`/tasks/`, task)
}

export const DelTask = (id) => {
  return instance.delete(`/tasks/${id}`)
}

export const GetUser = (id) => {
  return instance.get(`/user/?user_id=${id}`)
}

export const GetUsers = () => {
  return instance.get(`/users/`)
}

export const SetCommentDB = (comment) => {
  return instance.post(`/comments/`, comment)
}

export const PutComment = (comment) => {
  return instance.put(`/comments/`, comment)
}

export const DelComment = (id) => {
  return instance.delete(`/comments/${id}`)
}