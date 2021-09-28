using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        public RequestDelegate Next { get; }
        public ILogger<ExceptionMiddleware> Logger { get; }
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            Logger = logger;
            Next = next;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch(Exception e)
            {
                Logger.LogError(e,e.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;

                var response=_env.IsDevelopment() ? new ApiException(context.Response.StatusCode, e.Message,e.StackTrace?.ToString())
                : new ApiException(context.Response.StatusCode, "Internal Server Error");

                var options= new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(response,options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}