using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MeleeScript : MonoBehaviour {

    public float damaga;
    public float knockBack;
    public float knockBackRadius;
    public float meleeRate;

    float nextMelee;
    int shootableMask;

    Animator myAnim;
    playerController myPC;
    // Start is called before the first frame update
    void Start() { 
        shootableMask = LayerMask.GetMask("Shootable");
        //aceder ao root do soldado
        myAnim = transform.root.GetComponent<Animator>();

        myPC = transform.root.GetComponent<playerController>();

        nextMelee = 0f;
        
    }

    // Update is called once per frame
    void FixedUpdate() {
        float melee = Input.GetAxis("Fire2");

        if(melee > 0 && nextMelee < Time.time && !(myPC.getRunning())) {
            myAnim.SetTrigger("GunMelee");

            nextMelee = Time.time + meleeRate;

            //damage

            Collider[]  attacked = Physics.OverlapSphere(transform.position, knockBackRadius, shootableMask);

        }
    }
}
