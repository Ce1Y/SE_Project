
package SE_Project.demo.configs;


import SE_Project.demo.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    CustomizeAuthenticationSuccessHandler customizeAuthenticationSuccessHandler;
    @Autowired
    CustomizeAuthenticationFailHandler customizeAuthenticationFailHandler;
    @Bean
    public UserDetailsService mongoUserDetails() {
        return new CustomUserDetailsService();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        UserDetailsService userDetailsService = mongoUserDetails();
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder);

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/","/index.html").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/signup","/register.html","/getSignup").permitAll()
                .antMatchers("/error","/webjars/**","/css/**","/js/**").permitAll()
                .anyRequest()
                .authenticated().and().csrf().disable().cors().disable().formLogin().successHandler(customizeAuthenticationSuccessHandler)
                .failureHandler(customizeAuthenticationFailHandler)
                .loginProcessingUrl("/login")
                .loginPage("/login.html")
                .usernameParameter("email")
                .passwordParameter("password")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/").and().exceptionHandling()
                .and().oauth2Login()
                .loginPage("/login.html")
                .and().csrf().disable(); // disable CSRF

    }

//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web
//                .ignoring()
//                .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
//    }
    @Bean
    public UsernamePasswordAuthenticationFilter authenticationFilter() throws Exception {
        UsernamePasswordAuthenticationFilter filter = new UsernamePasswordAuthenticationFilter();

        /// Set parameter name called username
        filter.setUsernameParameter("username");
        // Set parameter name called password
        filter.setPasswordParameter("password");
        /// Only accept POST
        filter.setPostOnly(true);

        /// Set request matcher
        filter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login", "POST"));
        /// Set AuthenticationManager (Get the default AuthenticationManager)
        filter.setAuthenticationManager(authenticationManagerBean());

        return filter;
    }


}


