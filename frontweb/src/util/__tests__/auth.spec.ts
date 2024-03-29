import { hasAnyRoles} from '../auth'
import * as TokenModule from '../token'

describe ("hasAnyRoles tests", () => {
  test("should return  true when empty list", ()=> {
    const result = hasAnyRoles([])
    expect(result).toEqual(true)
  });
  
  test("should return  true when has given role", ()=> {
    jest.spyOn(TokenModule, 'getTokenData').mockReturnValue({
      exp: 0,
      user_name: '',
      authorities: ['ROLE_ADMIN', 'ROLE_OPERATOR']
    })

      const result = hasAnyRoles(['ROLE_ADMIN'])
      expect(result).toEqual(true)
    });
})