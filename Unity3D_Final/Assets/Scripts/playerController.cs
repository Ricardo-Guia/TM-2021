using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class playerController : MonoBehaviour{
    // Start is called before the first frame update
    
    public float runSpeed;
    public float walkSpeed;

    Rigidbody myRB;
    Animator myAnim;
    bool direita;

    bool running;

    bool grounded = false;
    Collider[] groundCollisions;
    float groundCheckRadius = 0.2f;
    public LayerMask groundLayer;
    public Transform groundCheck;
    public float jumpHeight;


    
    void Start(){
        myRB = GetComponent<Rigidbody>();
        myAnim = GetComponent<Animator>();

        direita = true;
        
    }

    // Update is called once per frame
    void Update(){
        
    }


    void FixedUpdate(){

        running = false;

        float move = Input.GetAxis("Horizontal");
        myAnim.SetFloat("Speed" , Mathf.Abs(move));

    
        float devagar = Input.GetAxisRaw("Fire3");
        myAnim.SetFloat("Devagar" , devagar);

        float firing = Input.GetAxis("Fire1");
         myAnim.SetFloat("Shooting" , firing);

        if((devagar > 0 || firing>0 ) && grounded){
            myRB.velocity = new Vector3(move * walkSpeed, myRB.velocity.y , 0);
        }else{
            myRB.velocity = new Vector3(move * runSpeed, myRB.velocity.y , 0);
            
            if(Mathf.Abs(move) > 0){
                running = true;
            }
            
        }

    
        if(move > 0 && !direita ){
            Flip();
        }else if(move < 0 && direita){
            Flip();
        }


        groundCollisions = Physics.OverlapSphere(groundCheck.position , groundCheckRadius , groundLayer);

        if(groundCollisions.Length > 0){
            grounded = true;
        }else{
            grounded = false;
        }

        myAnim.SetBool("Grounded" , grounded);

        if( grounded && Input.GetAxis("Jump") > 0 ){
            grounded = false;
            myAnim.SetBool("Grounded" , grounded);
            myRB.AddForce(new Vector3(0 , jumpHeight , 0 ));
        }



    }

    void Flip(){
        direita = !direita;
        Vector3 theScale = transform.localScale;
        theScale.z *= -1;
        transform.localScale = theScale;
    }

    public float GetFacing(){
        if(direita){
            return 1;
        }else{
            return -1;
        }
    }

    public bool getRunning(){
        return(running);
    }
}
