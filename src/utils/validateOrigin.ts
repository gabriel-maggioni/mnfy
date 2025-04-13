 
 const validateOrigin = (req: any, reply: any, done: () => void) => {
    const origin = req.headers.origin || req.headers.host || "*";
    if (process.env.DOMAIN === "*"){
      return done();
    }
    else if (process.env.DOMAIN && !process.env.DOMAIN.includes(origin)) {
      return reply.code(401).send({ statusCode: 401, message: "Not Authorized" });
    }
     return done();
  };  

  export default validateOrigin