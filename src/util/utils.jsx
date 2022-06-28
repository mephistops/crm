import { GetOneGender } from "../services/contacts"

export const getGender = (id) => {
  GetOneGender(id).then((res) => {
    console.log(res.data)
    return res.data.description
  })
}